import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import {SIGNIN } from "../../src/assets";
import { layout } from "../../src/style";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";


const Singup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [ZibCode, setZibCode] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const theme = useTheme()
  const navigate =useNavigate()
  const { t } = useTranslation();


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("email", email);
    newForm.append("firstname", firstname);
    newForm.append("lastname", lastname);
    newForm.append("ZibCode", ZibCode);
    newForm.append("PhoneNumber", PhoneNumber);
    newForm.append("Address", Address);
    newForm.append("password", password);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setFirstname();
        setLastname();
        setAddress();
        setZibCode();
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (

    <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
  <img src={SIGNIN} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

  {/* gradient start */}
  <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
  <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
  {/* gradient end */}
</div>

<div className={"flex-1  flex-col"}>
<div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="mt-6 text-center text-gradient text-3xl font-extrabold text-gray-900">
      {t('register')}
    </h2>
  </div>
  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium "
          >
      {t('firstName')}
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="firstname"
              autoComplete="firstname"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className={` ${theme.palette.mode === "light" ? "" : "bg-gray-400"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium "
          >
 {t('lastName')}          
 </label>
          <div className="mt-1">
            <input
              type="text"
              name="lastName"
              autoComplete="lastName"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className={` ${theme.palette.mode === "light" ? "" : "bg-gray-400"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium "
          >
             {t('zipCode')}
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="ZipCode"
              autoComplete="ZipCode"
              required
              value={ZibCode}
              onChange={(e) => setZibCode(e.target.value)}
              className={` ${theme.palette.mode === "light" ? "" : "bg-gray-400"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium "
          >
            {t('address')}
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="address"
              autoComplete="address"
              required
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              className={` ${theme.palette.mode === "light" ? "" : "bg-gray-400"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium "
          >
           {t('phoneNumber')}
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="PhoneNumber"
              autoComplete="PhoneNumber"
              required
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={` ${theme.palette.mode === "light" ? "" : "bg-gray-400"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium "
          >
{t('emailAddress')}         
 </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={` ${theme.palette.mode === "light" ? "" : "bg-gray-400"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium "
          >
           {t('password')}
          </label>
          <div className="mt-1 relative">
            <input
              type={visible ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={` ${theme.palette.mode === "light" ? "" : "bg-gray-400"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {visible ? (
              <AiOutlineEye
                className="absolute right-2 top-2 cursor-pointer"
                size={25}
                onClick={() => setVisible(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-2 top-2 cursor-pointer"
                size={25}
                onClick={() => setVisible(true)}
              />
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="avatar"
            className="block text-sm font-medium "
          ></label>
          <div className="mt-2 flex items-center">
            <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="avatar"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <RxAvatar className="h-8 w-8" />
              )}
            </span>
            <label
              htmlFor="file-input"
              className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <span>{t('uploadFile')}</span>
              <input
                type="file"
                name="avatar"
                id="file-input"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileInputChange}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-gradient"
          >
            {t('submit')}
          </button>
        </div>
        <div className={`${styles.noramlFlex} w-full`}>
          <h4>{t('alreadyHaveAccount')}</h4>
          <Link to="/login" className="text-gradient pl-2">
            {t("signIn")}
          </Link>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
</section>
    
  );
};

export default Singup;
