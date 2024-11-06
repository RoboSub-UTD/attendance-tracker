<script lang="ts">
	import { goto } from '$app/navigation';

	let netIDInput: HTMLInputElement;
	let success: HTMLElement;
	let error: HTMLElement;
</script>

<div class="content">
	<h1>RoboSub Attendance!!</h1>
	<br />
	<form
		on:submit={async () => {
			let response = await fetch('api/login', {
				method: 'POST',
				body: JSON.stringify({
					netID: netIDInput.value
				})
			});

			if (!response.ok) {
				localStorage.setItem('netID', netIDInput.value);
				await goto('/register');
			}

			netIDInput.value = '';

			success.innerText = 'Successfully counted attendance! You may exit this page.';
			success.hidden = false;
		}}
	>
		<label for="netID">NetID:</label>
		<br />
		<input id="netID" type="text" value="" bind:this={netIDInput} />
		<br /><br />
		<button id="submit">Submit</button>
		<br /><br />
		<sub>Not registered? <a href="/register">click here to do that!</a></sub>
	</form>
	<p id="success" class="success" hidden bind:this={success}></p>
	<p id="error" class="error" hidden bind:this={error}></p>
	<br />
</div>
