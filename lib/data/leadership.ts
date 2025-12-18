// Hardcoded backup leadership data
// This data is used as a fallback if Airtable is unavailable
export interface LeadershipMember {
  id: string;
  Name: string;
  Position: string;
  Bio?: string;
  Email?: string;
  Phone?: string;
}

export const LEADERSHIP_DATA: LeadershipMember[] = [
  {
    id: "pastor-1",
    Name: "Pastor Doug Reeder",
    Position: "Pastor",
    Bio: "Pastor Doug Reeder has been serving at CFBC since 1989 and became Senior Pastor in 2002. His passion is to lead our church family in knowing God's Word, growing in faith, and reaching the lost with the Gospel of Jesus Christ. A graduate of Liberty University, Pastor Doug brings a strong biblical foundation and a heart for discipleship. He is committed to expository preaching that challenges believers to live out their faith in practical, meaningful ways.",
    Email: "pastor9919@gmail.com",
    Phone: "(440) 354-8994",
  },
  {
    id: "deacon-1",
    Name: "Joe Burke",
    Position: "Deacon",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    id: "deacon-2",
    Name: "Jim Carnovale",
    Position: "Deacon",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    id: "deacon-3",
    Name: "Gene Hodgson",
    Position: "Deacon",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    id: "trustee-1",
    Name: "Dave Babuder",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    id: "trustee-2",
    Name: "John Carrus",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    id: "trustee-3",
    Name: "George Dujanovic",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    id: "trustee-4",
    Name: "Ed Harris",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    id: "trustee-5",
    Name: "Mike McKenna",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    id: "trustee-6",
    Name: "Doug Sabattis",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
];

export function getLeadershipByPosition(position: string): LeadershipMember[] {
  return LEADERSHIP_DATA.filter(
    (member) => member.Position.toLowerCase() === position.toLowerCase()
  ).sort((a, b) => a.Name.localeCompare(b.Name));
}
