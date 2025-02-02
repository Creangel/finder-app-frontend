import { useEffect, useState } from 'react';
import { DrawSearchBox } from "./components/DrawSearchBox";
import { DrawBody } from "./components/DrawBody";
import { useFetchFinderResults } from './hooks/useFetchFinderResults';

const initParams = {
  finder: sessionStorage.getItem("finder"),
  find: sessionStorage.getItem("find"),
  query: sessionStorage.getItem("query"),
  pageNum: sessionStorage.getItem("pageNum"),
  start: sessionStorage.getItem("start"),
  type: sessionStorage.getItem("type"),
  sort: sessionStorage.getItem("sort"),
  inmeta: sessionStorage.getItem("inmeta"),
};

export const FinderApp = () => {

  const [ finderData, setFinderData ] = useState( initParams );
  const { queryResult, isLoading, setQueryParams } = useFetchFinderResults(initParams);

  const onSearch = (newData) => {
    setFinderData({...newData});
    setQueryParams({...newData});
  };

  useEffect(() => {
    console.log("Setting finderData on sessionStorage...");
    for (const [key, value] of Object.entries(finderData)) {
        sessionStorage.setItem(key, value);
    }
  }, [finderData]);

  return (
    <>
      {
          !isLoading && (<>
                            <DrawSearchBox info={ queryResult.dataRender }
                                            onSearch={ onSearch }
                                            finderData={ finderData }
                                          />  
                            <DrawBody info={ queryResult }
                                      onSearch={ onSearch }
                                      finderData={ finderData } />                      
                        </>
                        )
      }
    </>
  );
};

