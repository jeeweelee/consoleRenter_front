import React, {useState,useEffect} from 'react'
import {getAllConsoles } from '../utils/ApiFunctions';
import ConsoleCard from './ConsoleCard';
import { Container,Row,Col} from 'react-bootstrap';
import ConsoleFilter from '../common/ConsoleFilter';
import ConsolePaginator from '../common/ConsolePaginator';

const Console = () => {
  const [data,setData] = useState([])
  const [error,setError] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const [currentPage,setCurrentPage] = useState(1)
  const [consolesPerPage] = useState(6)
  const [filteredData,setFilteredData] = useState([{id: ""}])

  useEffect(()=>{
    setIsLoading(true)
    getAllConsoles().then((data) =>{
      setData(data)
      setFilteredData(data)
      setIsLoading(false)
    }).catch((error) =>{
      setError(error.message)
      setIsLoading(false)
    })

    

  },[])
  if(isLoading) {
    return<div>Loading consoles...</div>
  }
  if(error){
    return <div className="text-danger">Error: {error}</div>
  }

  const handlePageChange = (pageNumber) =>{
    setCurrentPage(pageNumber)
  }
  const totalPages = Math.ceil(filteredData.length / consolesPerPage)

  const renderConsoles = () =>{
    const startIndex = (currentPage -1) * consolesPerPage
    const endIndex = startIndex + consolesPerPage
    return filteredData.slice(startIndex,endIndex).map((console) => <ConsoleCard key = {console.id} console = {console}></ConsoleCard>)
  }


  return (
    <Container>
      <Row>
        <Col md= {6} className = "mb-3 mb-md-0">
        <ConsoleFilter data= {data} setFilteredData={setFilteredData}></ConsoleFilter>
        </Col>

        <Col md= {6} className = "d-flex align-items-center justify-content-end">
        <ConsolePaginator currentPage = {currentPage}
        totalPages = {totalPages}
        onPageChange={handlePageChange}>
        </ConsolePaginator>
        </Col>
      </Row>

      <Row>
        {renderConsoles()}
      </Row>

      <Row>
      <Col md= {6} className = "d-flex align-items-center justify-content-end">
        <ConsolePaginator currentPage = {currentPage}
        totalPages = {totalPages}
        onPageChange={handlePageChange}>
        </ConsolePaginator>
        </Col>
      </Row>
      
    </Container>
  )
}

export default Console
