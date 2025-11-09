import {Field, Form} from "react-final-form";
import {useNavigate, useLocation} from "react-router-dom";

const reviewWrite = () => {
  const navigate = useNavigate()
  const state = useLocation()

  const onSubmit = async values => {
    console.log(values) // TODO should also send the currently logged in users name and email aswell!!
    // For future reference values are rating and comment right now!!
    //dispatch(addNewReview())
    //navigate(state.pathname)
  }

  //TODO TODO change the rating input cuz its ugly, smelly and kinda weird to use!!!
  return (
    <div>
      <div>{state.state.id}</div>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className={''}>
              <label>Rating</label>
              <Field
                name={'rating'}
                component={'input'}
                type={'range'}
                min={'1'}
                max={'5'}
                step={'1'}
                defaultValue={'3'}
              />
            </div>

            <div className={''}>
              <Field
                name={'comment'}
                component={'input'}
                type={'text'}
                placeholder={'Comment..'}
                maxLength={'250'}
              />
            </div>

            <button
              type={'submit'} disabled={submitting || pristine}
              className={''}
            >
              Submit the thing
            </button>

            <button
              type={"button"}
              onClick={form.reset}
              disabled={submitting || pristine}
              className={''}
            >
              I reset the form!!
            </button>

          </form>
        )}
      />
    </div>
  )
}

export default reviewWrite