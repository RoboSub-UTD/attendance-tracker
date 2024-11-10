<script lang="ts">
	import { goto } from '$app/navigation';

	let cometCardIDInput: HTMLInputElement;
	let success: HTMLElement;
</script>

<div class="content">
	<h1>RoboSub Attendance!!</h1>
	<br />
	<form
		on:submit={async () => {
			/*
			get just the serial number and characters to the left and right from the card swipe
			e.g., ;0123456789012345=
			this might break if the reader cant get all 3 strips but idk
			*/
			let cometCardID = cometCardIDInput.value;

			const i0 = cometCardID.indexOf(';');
			const i1 = cometCardID.indexOf('=');
			if (i0 === -1 || i1 === -1 || i0 > i1) {
				cometCardIDInput.value = '';
				return;
			}

			// remove the ';' and '=' from the cometCardID and just get the numbers
			cometCardID = cometCardID.substring(cometCardID.indexOf(';')+1, cometCardID.indexOf('='));

			// try to log in
			let response = await fetch('api/login', {
				method: 'POST',
				body: JSON.stringify({
					cometCardID
				})
			});

			if (!response.ok) {
				// if logging in fails, save the cometCardID for later and redirect to the /register page
				localStorage.setItem('cometCardID', cometCardID);
				await goto('/register');
			} else {
				// if logging in succeeds, clear the cometCardIDInput value and give the success message
				cometCardIDInput.value = '';
				success.innerText = 'Successfully counted attendance!';
				setTimeout(() => {
					success.innerText = '';
				}, 3000);
			}
		}}
	>
		<label for="netID">Swipe!</label>
		<br />
		<input id="cometCardID" type="text" value="" bind:this={cometCardIDInput} />
	</form>
	<p id="success" class="success" bind:this={success}></p>
	<br />
</div>
