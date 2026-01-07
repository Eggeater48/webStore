import {Field, Form} from "react-final-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import userService from "../services/userService.js";
import {setUser} from "../reducers/userReducer.js";

// Shows you all the cool personal information about your profile and allows you to change them if you want
const DashboardUserDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  const handleSubmit = async (details) => {
    console.log(details)
    const result = await userService.updateUserData(user.id, details)
    dispatch(setUser(result))
    navigate("/dashboard")
  }

  // TODO work on the styling of this part
  return (
    <div className={""}>
      <Form onSubmit={handleSubmit} render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} className={"flex justify-center items-center flex-col align-middle mt-12"}>
          <div className={""}>

          </div>

          <div className={"flex flex-col"}>
            <label>Username</label>
            <Field
              name={'username'}
              component={'input'}
              type={'text'}
              placeHolder={user.username}
              className={'p-5 placeholder-black focus:placeholder-neutral-300'}
            />
          </div>

          <div className={"flex flex-col"}>
            <label>Your name</label>
            <Field
              name={'name'}
              component={'input'}
              type={'text'}
              placeHolder={user.name}
              className={'p-5 placeholder-black focus:placeholder-neutral-300'}
            />
          </div>

          <div className={"flex flex-col"}>
            <label>Your email</label>
            <Field
              name={'email'}
              component={'input'}
              type={'text'}
              placeHolder={user.email}
              className={'p-5 placeholder-black focus:placeholder-neutral-300'}
            />
          </div>

          <div className={"flex flex-col"}>
            <label>Phone number</label>
            <Field
              name={'phoneNumber'}
              component={'input'}
              type={'text'}
              placeHolder={user.addressSettings.phoneNumber}
              className={'p-5 placeholder-black focus:placeholder-neutral-300'}
            />
          </div>

          <button className={"mt-5 border-neutral-400 border-1 border-solid rounded-md h-12 cursor-pointer"} type={"submit"} disabled={submitting || pristine}>
            Update details!!
          </button>

        </form>
      )}>

      </Form>

      <Form onSubmit={handleSubmit} render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} className={"flex justify-center items-center flex-col align-middle mt-12"}>
          <div className={"flex flex-col gap-4"}>
            <div className={""}>
              Personal information
            </div>

            <div className={"flex flex-col"}>
              <label>Country</label>
              <Field
                name={'country'}
                component={'input'}
                type={'text'}
                placeHolder={user.addressSettings.country}
                className={'p-5 placeholder-black focus:placeholder-neutral-300'}
              />
            </div>

            <div className={"flex flex-col"}>
              <label>Address</label>
              <Field
                name={'address'}
                component={'input'}
                type={'text'}
                placeHolder={user.addressSettings.address}
                className={'p-5 placeholder-black focus:placeholder-neutral-300'}
              />
            </div>

            <div className={"flex flex-col"}>
              <label>State province</label>
              <Field
                name={'stateProvince'}
                component={'input'}
                type={'text'}
                placeHolder={user.addressSettings.stateProvince}
                className={'p-5 placeholder-black focus:placeholder-neutral-300'}
              />
            </div>

            <div className={"flex flex-col"}>
              <label>City</label>
              <Field
                name={'city'}
                component={'input'}
                type={'text'}
                placeHolder={user.addressSettings.city}
                className={'p-5 placeholder-black focus:placeholder-neutral-300'}
              />
            </div>

            <div className={"flex flex-col"}>
              <label>Zip code</label>
              <Field
                name={'zipCode'}
                component={'input'}
                type={'text'}
                placeHolder={user.addressSettings.zipCode}
                className={'p-5 placeholder-neutral-600 focus:placeholder-neutral-300'}
              />
            </div>

            <button className={"rounded-md border-1 border-solid border-neutral-400 h-12 cursor-pointer"} type={"submit"} disabled={submitting || pristine}>
              Update details
            </button>
          </div>
        </form>
      )}>

      </Form>



    </div>
  )
}

export default DashboardUserDetails