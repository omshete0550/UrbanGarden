import React, { useEffect, useState } from 'react'
import FilterCateg from './FilterCateg'
import GridCateg from './GridCateg'
import "./SingleCateg.css"
import { useLocation } from 'react-router-dom';

const createInitialFilters = () => ({
  categories: [],
  seasons: [],
  ratings: [],
  price: [0, 5000],
});

const SingleCategLayout = () => {
  const location = useLocation()
  const categoryName = location.pathname.split('/')[2]
  const [filters, setFilters] = useState(createInitialFilters);
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setFilters(createInitialFilters());
    setSort("featured");
  }, [categoryName]);

  return (
    <div >
        <div className="SingleCateg">
            <div className='filter'>
                <FilterCateg
                  filters={filters}
                  onChange={setFilters}
                  onClear={() => setFilters(createInitialFilters())}
                />
            </div>
            <div className='grid'>
                <GridCateg
                  gridheading={categoryName}
                  filters={filters}
                  sort={sort}
                  onSortChange={setSort}
                />
            </div>
        </div>
    </div>
  )
}

export default SingleCategLayout
