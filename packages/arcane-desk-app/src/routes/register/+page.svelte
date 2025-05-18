<script lang="ts">
	import type { ActionData } from './$types';
	import { Title, Form, Input, Button, Card } from '$lib/components';

	let { form }: { form: ActionData } = $props();

	let username = $state('');
	let password = $state('');
	let email = $state('');
</script>

<div
	class="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-12 sm:px-6 lg:px-8 dark:bg-stone-900"
>
	<Card variant="parchment">
		<div class="mb-8 text-center">
			<Title level={1} align="center">Arcane Desk</Title>
			<Title level={3} align="center" variant="secondary">Create Account</Title>
		</div>

		<Form method="post" action="?/register">
			<Input
				type="text"
				name="username"
				label="Username"
				bind:value={username}
				required
				placeholder="Choose a username"
				error={form?.message && form.message.includes('username') ? form.message : ''}
			/>

			<Input
				type="password"
				name="password"
				label="Password"
				bind:value={password}
				required
				placeholder="Create a password"
				error={form?.message && form.message.includes('password') ? form.message : ''}
			/>

			<Input
				type="email"
				name="email"
				label="Email"
				bind:value={email}
				required
				placeholder="Enter your email"
				error={form?.message && form.message.includes('email') ? form.message : ''}
			/>

			<div class="mt-6">
				<Button type="submit" fullWidth>Register</Button>
			</div>

			{#if form?.message && !form.message.includes('username') && !form.message.includes('password') && !form.message.includes('email')}
				<p class="mt-4 text-center text-red-600">{form.message}</p>
			{/if}

			<div class="mt-6 text-center text-sm text-stone-600 dark:text-stone-400">
				Already have an account?
				<a
					href="/login"
					class="font-medium text-amber-700 underline hover:text-amber-800 dark:text-amber-500 dark:hover:text-amber-400"
				>
					Login
				</a>
			</div>
		</Form>
	</Card>
</div>
