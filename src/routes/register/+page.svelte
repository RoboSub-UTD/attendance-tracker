<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let netIDInput: HTMLInputElement;
	let nameInput: HTMLInputElement;

	let hydromedaProgramming: HTMLInputElement;
	let hydromedaMechanical: HTMLInputElement;
	let hydromedaElectrical: HTMLInputElement;

	let floatProgramming: HTMLInputElement;
	let floatMechanical: HTMLInputElement;
	let floatElectrical: HTMLInputElement;

	let galaxseaProgramming: HTMLInputElement;
	let galaxseaMechanical: HTMLInputElement;
	let galaxseaElectrical: HTMLInputElement;

	let miniFloatProgramming: HTMLInputElement;
	let miniFloatMechanical: HTMLInputElement;
	let miniFloatElectrical: HTMLInputElement;

	let success: HTMLElement;
	let error: HTMLElement;

	let netID: string;
	onMount(() => {
		netID = localStorage.getItem('netID') || '';
		localStorage.removeItem('netID');
	});
</script>

<div class="content">
	<h1>Register</h1>
	<br />
	<form
		on:submit={async () => {
			let response = await fetch('api/register', {
				method: 'POST',
				body: JSON.stringify({
					netID: netIDInput.value,
					name: nameInput.value,
					projects: {
						hydromedaProgramming: hydromedaProgramming.checked,
						hydromedaMechanical: hydromedaMechanical.checked,
						hydromedaElectrical: hydromedaElectrical.checked,

						floatProgramming: floatProgramming.checked,
						floatMechanical: floatMechanical.checked,
						floatElectrical: floatElectrical.checked,

						galaxseaProgramming: galaxseaProgramming.checked,
						galaxseaMechanical: galaxseaMechanical.checked,
						galaxseaElectrical: galaxseaElectrical.checked,

						miniFloatProgramming: miniFloatProgramming.checked,
						miniFloatMechanical: miniFloatMechanical.checked,
						miniFloatElectrical: miniFloatElectrical.checked
					}
				})
			});

			if (response.ok) {
				success.innerText = 'Registered and attendance counted! you may exit this page.';
				success.hidden = false;
			} else {
				error.innerText = 'Failed to register :( Try refreshing?';
				error.hidden = false;
			}
		}}
	>
		<label for="netID">NetID: </label>
		<input id="netID" type="text" bind:value={netID} bind:this={netIDInput} />
		<br /><br />
		<label for="name">Name: </label>
		<input id="name" type="text" value="" bind:this={nameInput} />
		<br /><br />
		<h3>Projects:</h3>
		<div class="row">
			<div class="column">
				<h4>Hydromeda</h4>
				<label for="hydromeda-programming">Programming:</label>
				<input id="hydromeda-programming" type="checkbox" bind:this={hydromedaProgramming} />
				<br />
				<label for="hydromeda-mechanical">Mechanical:</label>
				<input id="hydromeda-mechanical" type="checkbox" bind:this={hydromedaMechanical} />
				<br />
				<label for="hydromeda-electrical">Electrical:</label>
				<input id="hydromeda-electrical" type="checkbox" bind:this={hydromedaElectrical} />
			</div>
			<div class="column">
				<h4>Float</h4>
				<label for="float-programming">Programming:</label>
				<input id="float-programming" type="checkbox" bind:this={floatProgramming} />
				<br />
				<label for="float-mechanical">Mechanical:</label>
				<input id="float-mechanical" type="checkbox" bind:this={floatMechanical} />
				<br />
				<label for="float-electrical">Electrical:</label>
				<input id="float-electrical" type="checkbox" bind:this={floatElectrical} />
			</div>
			<div class="column">
				<h4>Galaxsea</h4>
				<label for="galaxsea-programming">Programming:</label>
				<input id="galaxsea-programming" type="checkbox" bind:this={galaxseaProgramming} />
				<br />
				<label for="galaxsea-mechanical">Mechanical:</label>
				<input id="galaxsea-mechanical" type="checkbox" bind:this={galaxseaMechanical} />
				<br />
				<label for="galaxsea-electrical">Electrical:</label>
				<input id="galaxsea-electrical" type="checkbox" bind:this={galaxseaElectrical} />
			</div>
			<div class="column">
				<h4>Mini Float</h4>
				<label for="minifloat-programming">Programming:</label>
				<input id="minifloat-programming" type="checkbox" bind:this={miniFloatProgramming} />
				<br />
				<label for="minifloat-mechanical">Mechanical:</label>
				<input id="minifloat-mechanical" type="checkbox" bind:this={miniFloatMechanical} />
				<br />
				<label for="minifloat-electrical">Electrical:</label>
				<input id="minifloat-electrical" type="checkbox" bind:this={miniFloatElectrical} />
			</div>
		</div>
		<br /><br />
		<button id="submit">Submit</button>
	</form>
	<p id="success" class="success" hidden bind:this={success}></p>
	<p id="error" class="error" hidden bind:this={error}></p>
	<br />
</div>
