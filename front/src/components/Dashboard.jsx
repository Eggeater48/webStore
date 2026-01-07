import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { Field, Form } from "react-final-form";
import {useEffect, useState} from "react";
import userService from "../services/userService.js";

// Takes you to the other dashboard data display places depending on your choice
const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // I have no clue what i should put on this page
  return (
    <div className={"flex justify-center items-center flex-row gap-4 align-middle mt-12"}>
      <button className={"rounded-md border-1 border-solid border-neutral-400 w-32 h-12"} onClick={() => navigate("/dashboard/user")}>
        Your details
      </button>

      <button className={"rounded-md border-1 border-solid border-neutral-400 w-32 h-12"} onClick={() => navigate("/dashboard/orders")}>
        Your orders
      </button>

      <img
        src={"https://media1.tenor.com/m/RuiRqLj8HhAAAAAd/sillychamp-baby-seal.gif"}
        alt={"bleh"}
        className={"w-10 h-10 bottom-0 rounded-full"}
      />
    </div>
  )
}

export default Dashboard