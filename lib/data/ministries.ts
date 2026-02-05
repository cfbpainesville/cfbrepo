// Hardcoded ministries data
// This is the primary data source (no API calls)
// Update this file when ministries data changes

export interface MinistryRecord {
  id: string;
  "Ministry Name": string;
  Slug?: string;
  Description: string;
  "Age/Group Target"?: string;
  "Meeting Times"?: string;
  "Leader Contact"?: string;
  Photos?: Array<{ url: string }>;
}

export const MINISTRIES_DATA: MinistryRecord[] = [
  {
    id: "recKnk9l2N872LN3z",
    "Ministry Name": "Adult Bible Fellowship",
    Description:
      "Adults of all ages can join our Adult Bible Fellowship. We have different groups studying different portions of the bible. Currently split into two groups, one for young adults and another for 'mature' adults.",
    "Age/Group Target": "Open to anyone 18 or older",
    "Meeting Times": "Sundays 10:00-10:50",
    "Leader Contact": "Contact through church office or attend meetings",
    Slug: "adult-bible-fellowship",
  },
  {
    id: "recEugelh7xPFRElH",
    "Ministry Name": "AWANA",
    Description:
      "AWANA is a school year ministry that provides Bible-based teaching and discipleship for ages K through 6th grade. AWANA includes games, story time, and bible verse memorization with awards to encourage the children. This gives children the opportunity to know, love, and serve Jesus, no matter their background.\n\nNote: 4-5 year olds must be accompanied by a parent.",
    "Age/Group Target": "Ages K through 6th grade",
    "Meeting Times": "Sunday evenings 5:30-7:00 (during the school year)",
    "Leader Contact": "Church office: 440-354-8994",
    Slug: "awana",
  },
  {
    id: "recUhGrKAdR7eqsiy",
    "Ministry Name": "Bible Study Fellowship (Ladies)",
    Description:
      "BSF is an international Bible study group.  We are please to host a ladies group at our church.\n",
    "Age/Group Target": "Women who sign up through BSFs web site (https://www.bsfinternational.org/)",
    "Meeting Times": "Thursdays at 6:45pm",
    "Leader Contact": "Contact BSF through their web site",
  },
  {
    id: "recGVmPk1KxveiU3I",
    "Ministry Name": "Children's Church",
    Description:
      "We offer young people a more age appropriate message, engaging message related activities, and sometimes we add a surprise snack.",
    "Age/Group Target": "Young children",
    "Meeting Times": "During the sermon portion of the main service",
    Slug: "childrens-church",
  },
  {
    id: "recwM69Jq0WQxxVPP",
    "Ministry Name": "Helping Hands Food Pantry",
    Description:
      "Provides both physical and spiritual nourishment to those in the community. Distributes bags containing non-perishable food items to community members in need. Individuals may visit once monthly.",
    "Age/Group Target": "Community members in need (all ages)",
    "Meeting Times": "Contact the church office Thursday between 10am and 2pm to schedule a pick up time.",
    "Leader Contact": "Church office: 440-354-8994 (call to arrange appointment)",
    Slug: "helping-hands-food-pantry",
  },
  {
    id: "recKsmzCPvAE7jJui",
    "Ministry Name": "Men's Fraternity",
    Description: "Open to all men (18+)",
    "Age/Group Target": "All men of the church, friends are welcome!",
    "Meeting Times": "We have regularly scheduled events - contact the church office for details",
    "Leader Contact": "Contact through church's main contact page",
    Slug: "mens-ministry",
  },
  {
    id: "recFf9QkvYenGdaRS",
    "Ministry Name": "Music Ministry",
    Description:
      "The Music Ministry leads our congregation in worship through song. Uses various instruments and vocal arrangements to glorify God and enhance our worship experience.",
    "Age/Group Target": "Entire congregation, no age restrictions",
    "Meeting Times": "Serves during the worship services. Practices are scheduled based on the individuals involved.",
    "Leader Contact": "Talk to a member of the music ministry after a morning worship service.",
    Slug: "music-ministry",
  },
  {
    id: "recSneO2jBPdHp0MO",
    "Ministry Name": "Prayer Ministry",
    Description:
      "Join us in praying for families and friends in need, for our government, our community, our church.",
    "Meeting Times": "Wednesday 6:30pm, Thursday 2:00pm",
    Slug: "prayer-ministry",
  },
  {
    id: "recMzZEYRUrhihnZl",
    "Ministry Name": "727 Student Ministry",
    Description:
      "To create an environment where high school and middle school students are reached with God's love, helped to develop a real relationship with Him, and led to discover how to best honor God with their lives. Includes Teen Sunday School and Youth Group Bible Study.",
    "Age/Group Target": "Middle School and High School Students",
    "Meeting Times": "Sunday at 10:00am; Youth Group events scheduled monthly",
    "Leader Contact": "Contact church office: 440-354-8994",
    Slug: "727-student-ministry",
  },
  {
    id: "recrFgvlA3DMeEc1Z",
    "Ministry Name": "Women's Ministry",
    Description:
      "Focuses on providing spiritual support, encouragement, and community for women. Includes Women's Bible Study, Secret Sister Program, Bereavement Support, and Shower Ministry for weddings and babies.",
    "Age/Group Target": "Women of all ages",
    "Meeting Times": "Wednesdays at 10:00 AM in Fellowship Hall",
    "Leader Contact": "Join us on Wednesday, or contact the church office info@cfbchurch.net",
    Slug: "womens-ministry",
  },
];
