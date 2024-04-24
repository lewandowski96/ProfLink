import { BiBuilding, BiLogoAndroid, BiLogoHtml5 } from 'react-icons/bi';

const project=[
    {
        title: 'Web Development',
        icon:<BiLogoHtml5/>,
    },
    {
        title:'App Development',
        duration:'2 Hours',
        icon:<BiLogoAndroid/>,
    },
    {
        title:'App Development 2',
        duration:'2 Hours',
        icon:<BiLogoAndroid/>,
    },
  
];

const Card = () => {
  return (
    <div className='card--container'>
        {project.map((item)=>(
            <div className="card">
                <div className="card--cover">{item.icon}</div>
                <div className="card--title">
                    <h2>{item.title}</h2>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Card;