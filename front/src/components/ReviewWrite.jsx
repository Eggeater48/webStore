import {Field, Form} from "react-final-form";
import {useNavigate, useLocation} from "react-router-dom";

const reviewWrite = () => {
  const navigate = useNavigate()
  const state = useLocation()


  const onSubmit = async values => {
    console.log(values)

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
                name={'rating'}>
                {props => (
                  <fieldset className={""}>
                    <legend>Ratings</legend>
                    <label title={"1"}>
                      <input type={"radio"} id={"star1"} name={"star1"} value={"1"} />
                    </label>

                    <label title={"2"}>
                      <input type={"radio"} id={"star2"} name={"star2"} value={"2"} />
                    </label>

                    <label title={"3"}>
                      <input type={"radio"} id={"star3"} name={"star3"} value={"3"} />
                    </label>

                    <label title={"4"}>
                      <input type={"radio"} id={"star4"} name={"star4"} value={"4"} />
                    </label>

                    <label title={"5"}>
                      <input type={"radio"} id={"star5"} name={"star5"} value={"5"} />
                    </label>
                  </fieldset>
                )}
              </Field>
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