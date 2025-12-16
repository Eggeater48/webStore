import {Field, Form} from "react-final-form";

const AdminDashboardNewProduct = ({ addNewProduct }) => {
	return (
		<div className={""}>
			<div className={""}>
				Add a new product
			</div>

			<!-- This is gonna look so ugly!! esp with react final form  -->
			<Form
				onSubmit={addNewProduct}
				render={({handleSubmit, form, submitting, pristine, values}) => (
					<form onSubmit={handleSubmit}>
						<div className={""}>
							<div className={""}>
								Basic Information
							</div>
							<div className={''}>
								<Field
									name={'title'}
									component={'input'}
									type={'text'}
									placeholder={'Title..'}
									maxLength={'250'}
								/>
							</div>

							<div className={''}>
								<Field
									name={'description'}
									component={'input'}
									type={'text'}
									placeholder={'The description..'}
									maxLength={'250'}
								/>
							</div>

							<div className={''}>
								<Field
									name={'category'}
									component={'input'}
									type={'text'}
									placeholder={''}
									maxLength={'250'}
								/>
							</div>

							<div className={''}>
								<Field
									name={'price'}
									component={'input'}
									type={'text'}
									placeholder={'Price'}
									maxLength={'250'}
								/>
							</div>
						</div>

						DiscountPercentage
						Stock
						<div className={""}>
							<div className={""}>
								Product Tags
							</div>
						</div>
						sku
						weight
						<div className={""}>
							<div className={""}>
								Dimensions
							</div>

							<!-- Probably should specify if this is using the metric system or the other worse one here!! -->
							<div className={""}>
								<Field
									name={'width'}
									component={'input'}
									type={'text'}
									placeholder={'Width..'}
									maxLength={'250'}
								/>
							</div>

							<div className={""}>
								<Field
									name={'height'}
									component={'input'}
									type={'text'}
									placeholder={'Height..'}
									maxLength={'250'}
								/>
							</div>

							<div className={""}>
								<Field
									name={'depth'}
									component={'input'}
									type={'text'}
									placeholder={'Depth...'}
									maxLength={'250'}
								/>
							</div>
						</div>

						<div className={""}>
							<div className={""}>

							</div>
							<div className={""}>
								<Field
									name={'warrantyInformation'}
									component={'input'}
									type={'text'}
									placeholder={'Warranty length'}
									maxLength={'250'}
								/>
							</div>

							<div className={""}>
								<Field
									name={'shippingInformation'}
									component={'input'}
									type={'text'}
									placeholder={'Shipping time'}
									maxLength={'250'}
								/>
							</div>

							<div className={""}>
								<Field
									name={'returnPolicy'}
									component={'input'}
									type={'text'}
									placeholder={'Return policy'}
									maxLength={'250'}
								/>
							</div>

						</div>

						<div className={""}>
							images [ url here ]
							thumbnail url

							<div className={""}>
								<Field
									name={''}
									component={'input'}
									type={'text'}
									placeholder={''}
									maxLength={'250'}
								/>
							</div>

							<div className={""}>
								<Field
									name={''}
									component={'input'}
									type={'text'}
									placeholder={''}
									maxLength={'250'}
								/>
							</div>

						</div>
					</form>
				)}
			/>
		</div>
	)
}

export default AdminDashboardNewProduct