import { Snackbar, SnackbarContent} from "@mui/material" 

function ErrorAlert(props: {errorMessadge: string, showAlert: boolean, toggleShowAlert: () => void}) {
	
	const {errorMessadge, showAlert, toggleShowAlert} = props

	return (
		<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left', }}
				open={showAlert}
				onClose={toggleShowAlert}
				autoHideDuration={3000}
			>
				<SnackbarContent
				 sx={{backgroundColor: "red", color: "#FFFae5"}}
					message={errorMessadge} />
		</Snackbar>
	)
}

export default ErrorAlert