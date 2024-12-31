import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const email = localStorage.getItem("email");
  const psw = localStorage.getItem("psw");
  const { token, setToken, navigate, backendURL, setCartItems } =
    useContext(ShopContext);

  const [loguserName, setUserName] = useState("");
  const [passwords, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (passwords != newpassword) {
        const response = await axios.post(`${backendURL}/api/user/updateuser`, {
          email,
          passwords,
          newpassword,
        });
        console.log(response.data);
        toast.success("Password Update successfully");
        toast.info("You need login again");
        navigate("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("psw");
        setToken("");
        setCartItems({});
      } else {
        toast.warn("Enter same password?");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const onSubmitDeleteHandler = async (event) => {
    event.preventDefault();
    toast.warn("This action cannot be undone");

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );

    if (isConfirmed) {
      try {
        const response = await axios.post(`${backendURL}/api/user/deleteuser`, {
          email,
        });

        console.log(response.data);
        toast.success("User deleted successfully!");
        navigate("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("psw");
        setToken("");
        setCartItems({});
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      toast.info("User deletion canceled.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${backendURL}/api/user/data`, {
          email,
          psw,
        });
        console.log("Response Data:", response.data);
        setUserName(response.data.userName);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      fetchData(); // Call the async function
    }
  }, [token]); // Dependency array includes 'email'

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"PROFILE"} />
      </div>

      <form className="flex flex-col items-start w-[90%] sm:max-w-96 m-0 mt-14 gap-1 text-gray-800">
        <label className="m-0 pt-0">Name</label>
        <input
          value={loguserName}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="User Name"
          disabled
        />
        <label className="m-0 pt-0">Email</label>
        <input
          value={email}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="User Name"
          disabled
        />
      </form>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-start w-[90%] sm:max-w-96 m-0 mt-14 gap-1 text-gray-800"
      >
        <label className="m-0 pt-0">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={passwords}
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Current Password"
          required
        />
        <label className="m-0 pt-0">New Password</label>
        <input
          onChange={(e) => setNewPassword(e.target.value)}
          value={newpassword}
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="New Password"
          required
        />
        <button className="bg-blue-500 text-white font-light px-8 py-2 mt-4">
          Save
        </button>
      </form>
      <form
        onSubmit={onSubmitDeleteHandler}
        className="flex flex-col items-start w-[90%] sm:max-w-96 m-0 mt-14 gap-2 text-gray-800"
      >
        <label className="m-0 pt-0 text-red-500">Danger zone</label>
        <button className="bg-red-500 text-white font-light px-8 py-2 mt-4">
          Account Deletion
        </button>
      </form>
    </div>
  );
};

export default Profile;
