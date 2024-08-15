import * as React from 'react';
import FormContainer from "../FormContainer/formContainer";
import { UrlData } from "../../interface/UrlData";
import axios from 'axios';
import { serverUrl } from '../../helpers/Constants';
import DataTable from '../DataTable/dataTable';


interface IContainerProps {
}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);

const updateReloadState = (): void =>{
  setReload(true);
}
  const fetchTableData = async () => {
    const response = await axios.get(`${serverUrl}/shortUrl`);

    console.log("The response from Server is :  ", response);
    setData(response.data);
    setReload(false);
    // console.log("Data:",data);
    };

  React.useEffect(() =>{
    fetchTableData();
  }, [reload]);

  return(
   <>
  < FormContainer updateReloadState={updateReloadState}/>
  < DataTable updateReloadState={updateReloadState}  data ={data}/>
  
  </>
    );
  
};

export default Container;
