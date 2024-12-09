import React, { useEffect, useState } from 'react';
import { icons } from 'lucide-react';
import  {Button} from './ui/button';
import { Input } from './ui/input';


const Dashboard = () => {
    const [dataB, setDataB] = useState<any>(null)
    const [type, setType] = useState('posts')

    const handleTypeChange = (newType:any) =>{
        setType(newType)
    }

    const getData = async() =>{
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/${type}`, {
            method:'GET'
          })
          const datta = await response.json()
          setDataB(datta)
        } catch (error) {
          console.error(`error: ${error}`);
          
        }
      }

    useEffect(()=>{
        getData()
    },[type])
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-12 md:col-span-2">
          <Sidebar onTypeChange={handleTypeChange} />
        </div>
        <div className="col-span-12 md:col-span-10">
          <Table data={dataB} head={type} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const Navbar = () => {
    const LogOut = icons['LogOut']
    const Person = icons['UserRound']
    const Search = icons['Search']
  return (
    <nav className="flex justify-between items-center p-2 shadow-md bg-gradient-to-b from-gray-100 to-transparent border-10">
      <div>
        <img src="/logo.jpg" alt="logo" width={80} height={40} />
      </div>

      <div className='flex gap-2'>
        <Input placeholder='Search' className='rounded-xl'/>
        <Button className='rounded-xl hover:bg-gray-300'><Search color='black'/></Button>
      </div>

      <div className=' flex gap-5'>
        <Button className=' bg-white hover:bg-gray-300'><LogOut  color='black'/></Button>
        <Button className=' bg-white hover:bg-gray-300'><Person color='black'/></Button>
      </div>
    </nav>
  );
};

const Sidebar = ({onTypeChange}) => {

    const datatypes = [{
        id:0,
        title:'posts'
    },{
        id:1,
        title:'comments'
    },{
        id:2,
        title:'albums'
    },{
        id:3,
        title:'photos',
    },{
        id:4,
        title:'todos'
    },{
        id:5,
        title:'users'
    }]
  return (
    <div className=" w-full h-full p-2 border-r">
        <h1 className='text-center text-xl'>DashBoard</h1>
      {/* <legend>Set type</legend> */}
      {datatypes.map((each)=>(
        <div key={each.id}>
            <Button className=' w-full bg-white text-black p-2 my-2 hover:bg-gray-300 rounded-xl  ' onClick={()=>onTypeChange(each.title)}>{each.title}</Button>
        </div>
      ))}


        {/* user button */}
      <div>

      </div>
    </div>
  );
};




const Table = ({ data, head }) => {
  const [headers, setHeaders] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // State for selected row
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    if (data && data.length > 0) {
      const extractHeaders = (item) => {
        const getAllKeys = (obj, prefix = "") => {
          return Object.keys(obj).reduce((acc, key) => {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
              return [...acc, ...getAllKeys(obj[key], newKey)];
            }
            return [...acc, newKey];
          }, []);
        };
        return getAllKeys(item);
      };

      const uniqueHeaders = [...new Set(extractHeaders(data[0]))];
      setHeaders(uniqueHeaders);
    }
  }, [data]);

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : "N/A"), obj);
  };

  const openModal = (row) => {
    setSelectedRow(row); // Set the selected row data
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedRow(null); // Clear the selected row data
    setIsModalOpen(false); // Close the modal
  };

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="w-full h-full p-5">
      <div className="fixed-top flex justify-between items-center px-5">
        <div>
          <h1 className="text-xl font-extrabold uppercase">{head}</h1>
        </div>
        <div className="flex gap-2">
          <Button className="hover:bg-gray-300">A-Z</Button>
          <Button className="hover:bg-gray-300">Ascending</Button>
          <Button className="hover:bg-gray-300">Descending</Button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} onClick={() => openModal(item)} className="cursor-pointer">
                {headers.map((header) => (
                  <td key={header}>
                    {typeof getNestedValue(item, header) === "object"
                      ? JSON.stringify(getNestedValue(item, header))
                      : getNestedValue(item, header)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedRow && (
  <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
    <div
      className="modal-container bg-white rounded-lg shadow-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
        Close
      </button>
      <h1 className="text-xl font-bold mb-4">Row Details</h1>
      <div className="modal-body">
        <pre className="whitespace-pre-wrap break-words">
          {JSON.stringify(selectedRow, null, 2)}
        </pre>
      </div>
    </div>
  </div>
)}

    </div>
  );
};



