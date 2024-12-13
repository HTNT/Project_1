/************************************************************************/
/*                                                                      */
/*   Copyright (C) 2024. All rights reserved                            */
/*   Author     : [Đỗ Viết Tuế], [viettuekk123@gmail.com]               */
/*                                                                      */
/*   Created    : 06-04-2024 18:42:05.                                  */
/*   Modified   : 06-04-2024 18:42:05.                                  */
/*                                                                      */
/************************************************************************/
// eslint-disable-next-line
"use strict";

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/

// import { Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components";

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import {
  // iconPlus,
  iconShares,
} from "../../assets";
import "../../styles/filter/filter.css";

function Filter() {
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searched, setSearched] = useState(false);

  // eslint-disable-next-line
  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchPost = () => {
    try {
      if (searchValue) {
        navigate(`/home-page?search=${searchValue}`);
        setSearchValue("");
        setSearched(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchPost();
      setSearchValue("");
    }
  };

  return (
    <div className="filter__div">
          <div className="search__input">
            <Input
              type=" text "
              placeholder=" Tim Kiem"
              status="default"
              iconLeft={iconShares}
              iconSupporting = {null}
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className={`search-input ${searched ? "searched" : ""}`}
            />
          </div>
    </div>
  );
}

export { Filter };
