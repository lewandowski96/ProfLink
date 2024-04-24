export const SampleBusinessData = [
    {
        "_id": "1",
        "userId": "1",
        "basicDetails": {
            "name": "Tech Solutions Inc.",
            "industry": "Information Technology",
            "organizationType": "Private Limited Company",
            "organizationSize": "Medium",
            "tagline": ["Empowering Innovations", "Tech for Tomorrow"],
            "description": "Tech Solutions Inc. is a leading IT company providing innovative software solutions to businesses worldwide.",
            "legalBackgroundVerification": true
        },
        "productDetails": [
            {
                "_id": "1",
                "name": "DataX",
                "industry": "Information Technology",
                "description": "DataX is our flagship product, offering comprehensive data analytics solutions.",
                "image": "datax_product.jpg"
            },
            {
                "_id": "2",
                "name": "CloudGenius",
                "industry": "Information Technology",
                "description": "CloudGenius is a cloud computing platform designed to streamline business operations.",
                "image": "cloudgenius_product.jpg"
            }
        ],
        "achievementDetails": [
            {
                "_id": "1",
                "title": "Innovator of the Year 2023",
                "description": "Tech Solutions Inc. received the Innovator of the Year award at the Annual IT Expo 2023.",
                "image": "innovator_award_2023.jpg"
            },
            {
                "_id": "2",
                "title": "Top Employer 2022",
                "description": "Tech Solutions Inc. was recognized as one of the top employers in the tech industry in 2022.",
                "image": "top_employer_2022.jpg"
            }
        ],
        "customerTestimonials": [
            {
                "_id": "1",
                "name": "Alice Johnson",
                "email": "alice@example.com",
                "rating": 5,
                "description": "I've been using DataX for over a year now, and it has tremendously helped our business in making data-driven decisions."
            },
            {
                "_id": "2",
                "name": "Bob Smith",
                "email": "bob@example.com",
                "rating": 4,
                "description": "CloudGenius has simplified our IT infrastructure management. Great product!"
            }
        ],
        "advertisementDetails": [
            {
                "_id": "1",
                "title": "DataX Webinar",
                "description": "Join us for an exclusive webinar on DataX and learn how it can transform your business.",
                "targetAudience": "Business professionals",
                "budget": "$15,000",
                "image": "datax_webinar_ad.jpg"
            },
            {
                "_id": "2",
                "title": "CloudGenius Launch Campaign",
                "description": "Exciting launch campaign for CloudGenius! Avail special discounts for early adopters.",
                "targetAudience": "Small to medium-sized businesses",
                "budget": "$20,000",
                "image": "cloudgenius_launch_ad.jpg"
            }
        ]
    },
    {
        "_id": "2",
        "userId": "2",
        "basicDetails": {
            "name": "HealthFirst Clinic",
            "industry": "Healthcare",
            "organizationType": "Medical Center",
            "organizationSize": "Large",
            "tagline": ["Your Health, Our Priority", "Caring for You Always"],
            "description": "HealthFirst Clinic is a leading healthcare provider, offering comprehensive medical services to the community.",
            "legalBackgroundVerification": true
        },
        "productDetails": [
            {
                "_id": "1",
                "name": "TeleHealth Services",
                "industry": "Healthcare",
                "description": "Our TeleHealth services allow patients to consult with healthcare professionals remotely.",
                "image": "telehealth_service.jpg"
            },
            {
                "_id": "2",
                "name": "HealthFirst App",
                "industry": "Healthcare",
                "description": "The HealthFirst App helps patients book appointments, access medical records, and receive health tips.",
                "image": "healthfirst_app.jpg"
            }
        ],
        "achievementDetails": [
            {
                "_id": "1",
                "title": "Patient Choice Award 2022",
                "description": "HealthFirst Clinic received the Patient Choice Award for providing exceptional healthcare services.",
                "image": "patient_choice_award_2022.jpg"
            },
            {
                "_id": "2",
                "title": "Best Medical Center 2023",
                "description": "HealthFirst Clinic was recognized as the Best Medical Center at the Healthcare Excellence Awards 2023.",
                "image": "best_medical_center_2023.jpg"
            }
        ],
        "customerTestimonials": [
            {
                "_id": "1",
                "name": "Emily Brown",
                "email": "emily@example.com",
                "rating": 5,
                "description": "The TeleHealth service provided by HealthFirst Clinic has been a lifesaver for me. It's convenient and efficient!"
            },
            {
                "_id": "2",
                "name": "John Davis",
                "email": "john@example.com",
                "rating": 4,
                "description": "Using the HealthFirst App has made managing my healthcare appointments much easier. Highly recommended!"
            }
        ],
        "advertisementDetails": [
            {
                "_id": "1",
                "title": "TeleHealth Webinar",
                "description": "Join our TeleHealth webinar to learn about the benefits of remote healthcare services.",
                "targetAudience": "Patients and healthcare professionals",
                "budget": "$10,000",
                "image": "telehealth_webinar_ad.jpg"
            },
            {
                "_id": "2",
                "title": "HealthFirst App Launch",
                "description": "Exciting launch event for the HealthFirst App! Download now to access a range of healthcare services.",
                "targetAudience": "General public",
                "budget": "$15,000",
                "image": "healthfirst_app_launch_ad.jpg"
            }
        ]
    }
]

export const industries = [
    "Information Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Education",
    "Hospitality",
    "Transportation",
    "Media & Entertainment",
    "Real Estate",
    "Other"
];

export const organizationTypes = [
    "Sole Proprietorship",
    "Partnership",
    "Limited Liability Company (LLC)",
    "Corporation",
    "Nonprofit Organization",
    "Cooperative",
    "Other"
];

export const organizationSizes = [
    "Micro (1-9 employees)",
    "Small (10-49 employees)",
    "Medium (50-249 employees)",
    "Large (250+ employees)"
];

export const users = [
    {
        id: "1",
        name: "Nuwan Kumara",
    },
    {
        id: "2",
        name: "Kusal Madushanka",
    }
]

export const targetAudienceNames = [
    "Young Professionals",
    "Parents",
    "Fitness Enthusiasts",
    "Students",
    "Tech Enthusiasts",
    "Fashionistas",
    "Foodies",
    "Outdoor Adventurers",
    "Art Lovers",
    "Bookworms",
];