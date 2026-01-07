import {Field, Form} from "react-final-form";
import {useNavigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import products from "../services/products.js";


const reviewWrite = () => {
  const navigate = useNavigate()
  const state = useLocation()
  const user = useSelector(state => state.user)

  const onSubmit = async values => {
    const newReview = {
      ...values,
      reviewerName: user.name,
      reviewerEmail: user.email,
      date: new Date().toISOString()
    }

    await products.newReview(newReview, state.state.productData.id)

    navigate(`/${state.state.productData.id}`)

  }

  //TODO TODO change the rating input cuz its ugly, smelly and kinda weird to use!!!
  return (
    <div>
      <div>{state.state.id}</div>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className={'mt-20'}>
              <label>Rating</label>
              <Field
                name={'rating'}
                component={"input"}
                type={"number"}
                min={"1"}
                max={"5"}
                className={"p-5"}
                defaultValue={"1"}>
              </Field>
            </div>

            <div className={''}>
              <Field
                name={'comment'}
                component={"textarea"}
                placeholder={'Comment..'}
                maxLength={'250'}
                className={"w-64 h-20 p-2"}
              />
            </div>

            <button
              type={'submit'} disabled={submitting || pristine}
              className={''}>
              Submit review
            </button>
          </form>
        )}
      />
    </div>
  )
}

export default reviewWrite