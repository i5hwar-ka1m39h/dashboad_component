import React, { useEffect, useState } from 'react';
import { icons, LibraryBig, MessageCircle, StickyNote, Image, ListTodo, Users, ImagePlus, Target, Divide } from 'lucide-react';
import  {Button} from './ui/button';
import { Input } from './ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from './ui/label';



const Dashboard = () => {
    
    const [type, setType] = useState('posts')

    const handleTypeChange = (newType:any) =>{
        setType(newType)
    }

    

    
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-1 lg:col-span-2">
          <Sidebar onTypeChange={handleTypeChange} />
        </div>
        <div className="col-span-11 lg:col-span-10">
         {type==='add item'? <AddComponent/>: <Table  head={type} />}
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

      <div className='flex gap-2 items-center'>
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

const Sidebar = ({onTypeChange}:any) => {

    const datatypes = [{
        id:0,
        title:'posts',
        iconName :<StickyNote/>
    },{
        id:1,
        title:'comments',
        iconName: <MessageCircle/>,
    },{
        id:2,
        title:'albums',
        iconName: <LibraryBig/>,
    },{
        id:3,
        title:'photos',
        iconName: <Image/>
    },{
        id:4,
        title:'todos',
        iconName:<ListTodo/>,
    },{
        id:5,
        title:'users',
        iconName:<Users/>
    },{
      id:6,
      title:'add item',
      iconName:<ImagePlus/>
    }]
  return (
    <div className=" w-full h-full p-2 border-r">
        <h1 className='hidden lg:inline lg:text-center lg:text-xl'>DashBoard</h1>
      {/* <legend>Set type</legend> */}
      {datatypes.map((each)=>(
        <div key={each.id}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='flex justify-start w-full  '>
            <Button className='lg:flex lg:justify-start w-full bg-white text-black p-2 my-2 hover:bg-gray-300 rounded-xl  ' onClick={()=>onTypeChange(each.title)}>
              {each.iconName}
              <span className=' hidden lg:inline'>{each.title}</span>
            </Button>
            </TooltipTrigger>
            <TooltipContent side='right' className=' text-lg bg-black text-white rounded-xl '>{each.title}</TooltipContent>
            </Tooltip>
            </TooltipProvider>
        </div>
      ))}


        {/* user button */}
      {/* <div>

      </div> */}
    </div>
  );
};




const Table = ({  head }:{head:string}) => {
  const [data, setData] = useState<any>(null)
  const [headers, setHeaders] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState(null); // State for selected row
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const getData = async() =>{
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/${head}`, {
        method:'GET'
      })
      const datta = await response.json()
      setData(datta)
    } catch (error) {
      console.error(`error: ${error}`);
      
    }
  }

  useEffect(()=>{getData();},[head])

  useEffect(() => {
    if (data && data.length > 0) {
      const extractHeaders = (item:any) => {
        const getAllKeys = (obj:any, prefix:any = ""):any => {
          return Object.keys(obj).reduce((acc:any, key:any) => {
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

  const getNestedValue = (obj:any, path:any) => {
    return path.split(".").reduce((acc:any, part:any) => (acc && acc[part] !== undefined ? acc[part] : "N/A"), obj);
  };

  const openModal = (row:any) => {
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
              {headers.map((header:any) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item:any, index:any) => (
              <tr key={index} onClick={() => openModal(item)} className="cursor-pointer">
                {headers.map((header:any) => (
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


const AddComponent = () =>{
  const [formData, setFormData] = useState<any>({
    name:"",
    quantity:"",
    price:"",
  })

  const[file, setFile] = useState<File| undefined>()
  const[preview, setPreview] = useState<any>()

  const handleChange = (e:React.FocusEvent<HTMLInputElement>) =>{
    const {id, value} = e.target
    setFormData((prev:any) =>({
      ...prev,
      [id]:value
    }))
  }

  const handleSubmit = (e:React.SyntheticEvent) =>{
    e.preventDefault()

    if(!file) return;

    const formVal = new FormData()
    formVal.append('file', file)
    formVal.append('name', formData.name)
    formVal.append('price', formData.price)
    formVal.append('quantiy', formData.quantity)

    for (const [key, value] of formVal.entries()) {
      console.log(key, value);
    }
    
  
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    if(e.target.files && e.target.files[0]){
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      const reader = new FileReader();

      reader.onloadend = () =>{
        setPreview(reader.result as string)
      }

      reader.readAsDataURL(selectedFile)
    }

  }

  return(
    <div className=' grid grid-cols-12 m-5 gap-2'>
      {/* for submission of image */}
      <div className=' col-span-12 lg:col-span-6 border p-5 '>
        <form onSubmit={handleSubmit}>
          <div>
            <Label>Product name </Label>
            <Input type='text' value={formData.name} id="name" name='name'onChange={handleChange}/>
          </div>

          <div>
            <Label>Product quantity </Label>
            <Input type='text' value={formData.quantity} id='quantity' name='quantity'onChange={handleChange}/>
          </div>

          <div>
            <Label>Product price </Label>
            <Input type='text' value={formData.price} id='price' name='price' onChange={handleChange}/>
          </div>

          <div>
            <Label>Product image/images </Label>
            <Input type='file' name='image' id='image' accept='image/png, image/jpeg, image/jpg' onChange={handleFileChange}/>
          </div>

          <div>
            <Button type='submit' className='mt-5 hover:bg-gray-300'>Submit</Button>
          </div>
        </form>
      </div>

      {/* for preview */}
      <div className=' col-span-12 lg:col-span-6 w-full h-96 flex flex-col text-center border items-center'>
        <div className=''>

       {preview? <img src={preview} alt="preview" width={400} height={600}/> : <Filler/>}
        </div>
        

        <h1>image preview</h1>
      </div>

    </div>
  )
}

const Filler = () =>{
  return (
    <div className=' bg-gray-300 h-full'>
      No Image Selected
    </div>
  )
}