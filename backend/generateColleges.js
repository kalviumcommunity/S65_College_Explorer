const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const College = require('./models/CollegeModel');
const connectDB = require('./config/db');
const { google } = require('googleapis');
const axios = require('axios');
const https = require('https');

dotenv.config();


const cityData = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Namsai"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Haryana": ["Gurgaon", "Faridabad", "Chandigarh", "Rohtak", "Hisar"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali", "Solan", "Mandi"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belgaum"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Kolasib"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  "Sikkim": ["Gangtok", "Namchi", "Pelling", "Ravangla"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Mussoorie"],
  "West Bengal": ["Kolkata", "Siliguri", "Asansol", "Durgapur", "Darjeeling"],
  "Andaman and Nicobar Islands": ["Port Blair", "Havelock Island"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi": ["New Delhi", "Delhi", "Noida", "Gurgaon", "Faridabad"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Amini", "Kadmat"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"]
};


const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: true 
  })
});

const getCollegeImages = async (collegeName) => {
  try {
    const CSE_ID = process.env.GOOGLE_CSE_ID;
    const API_KEY = process.env.GOOGLE_API_KEY;
    
    console.log(`Using CSE_ID: ${CSE_ID}`);
    console.log(`Using API_KEY: ${API_KEY}`);
    
    const query = `${collegeName} campus building`;
    console.log(`Searching for images of: ${query}`);
    
    const response = await instance.get('https://customsearch.googleapis.com/customsearch/v1', {
      params: {
        cx: CSE_ID,
        q: query,
        searchType: 'image',
        num: 3,
        key: API_KEY
      }
    });
    
    console.log(`Found ${response.data?.items?.length || 0} images for ${collegeName}`);
    
    const images = response.data?.items?.map(item => item.link) || [];
    
    if (images.length > 0) {
      return images;
    } else {
      return ["https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"];
    }
  } catch (error) {
    console.error(`Error fetching images for ${collegeName}:`, error.message);
    console.error(`Error details:`, error.response?.data || error.message);
    return ["https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"];
  }
};

// Generate a random valid state-city pair
const getRandomStateAndCity = () => {
  const states = Object.keys(cityData);
  const randomState = states[Math.floor(Math.random() * states.length)];
  const citiesForState = cityData[randomState];
  const randomCity = citiesForState[Math.floor(Math.random() * citiesForState.length)];
  
  return { state: randomState, city: randomCity };
};

const generateCollegeData = async () => {
  try {
    // Create examples of valid state-city pairs to guide Gemini
    const exampleLocations = [];
    for (let i = 0; i < 5; i++) {
      exampleLocations.push(getRandomStateAndCity());
    }

    const prompt = `
Create a JSON array of 10 unique colleges in India with the following structure for each college:
{
  "name": "College Name",
  "state": "State Name",
  "city": "City Name",
  "address": "Complete Address",
  "courses": ["Course 1", "Course 2", "Course 3"],
  "website": "https://website.edu",
  "contact": "Phone Number",
  "email": "email@college.edu",
  "rating": 4.5, // a number between 1 and 5
   "description": "A detailed description of the college including its history, notable achievements, campus facilities, faculty quality, student life, and any unique features. The description should be at least 3-4 sentences long and provide comprehensive information that would help prospective students understand what makes this institution special."
}

IMPORTANT: Only use the following states and their corresponding cities:
${JSON.stringify(exampleLocations, null, 2)}

For reference, these are valid state and city combinations in my system.
Make the descriptions detailed and informative, focusing on what makes each college unique.
Include realistic courses offered by each college based on their specialization.
Do not include the images field. Only return the JSON array, nothing else. Make sure it's valid JSON.
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40
        }
      }),
    });

    const data = await response.json();
    console.log('Response from Gemini API:', JSON.stringify(data, null, 2));

    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      const text = data.candidates[0].content.parts[0].text;
      
      console.log('Raw text from API:', text);
      
      const jsonMatch = text.match(/\[\s*{[^]*}\s*\]/);
      if (jsonMatch) {
        const jsonText = jsonMatch[0];
        console.log('Extracted JSON:', jsonText);
        let collegeData = JSON.parse(jsonText);
        
       
        collegeData = collegeData.filter(college => {
          if (!cityData[college.state]) {
            console.log(`Skipping college with invalid state: ${college.name}, ${college.state}`);
            return false;
          }
          
          if (!cityData[college.state].includes(college.city)) {
            console.log(`Skipping college with invalid city: ${college.name}, ${college.city} in ${college.state}`);
            return false;
          }
          
          return true;
        });
        
        console.log('Successfully parsed JSON, enhancing with images...');
        
        for (const college of collegeData) {
          console.log(`Getting images for ${college.name}...`);
          college.images = await getCollegeImages(college.name);
    
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        return collegeData;
      } else {
        throw new Error('Could not find JSON array in the response');
      }
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error generating college data:', error);
    throw error;
  }
};

const seedColleges = async () => {
  try {
    await connectDB();

    const collegeData = await generateCollegeData();
    console.log('Generated college data:', collegeData);

    for (const college of collegeData) {
      const existingCollege = await College.findOne({ name: college.name, state: college.state, city: college.city });
      if (!existingCollege) {
        const newCollege = new College(college);
        await newCollege.save();
        console.log(`College ${newCollege.name} added successfully.`);
      } else {
        console.log(`College ${college.name} already exists.`);
      }
    }

    console.log('Seeding completed.');
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    mongoose.connection.close();
  }
};

seedColleges();
