<script lang="ts">
	import { Title, Button, Input, Form, Card, Badge } from '$lib/components';
	
	let demoInput = $state('');
</script>

<div class="min-h-screen bg-stone-100 dark:bg-stone-900 p-6">
	<div class="max-w-4xl mx-auto">
		<Title level={1} align="center">Arcane Desk Components</Title>
		<Title level={3} align="center" variant="secondary" class="mb-12">UI Component Library</Title>
		
		<!-- Buttons Section -->
		<Card class="mb-12">
			<Title level={2}>Buttons</Title>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
				<div>
					<Title level={4}>Variants</Title>
					<div class="flex flex-wrap gap-4 mt-4">
						<Button>Primary</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="danger">Danger</Button>
					</div>
				</div>
				
				<div>
					<Title level={4}>Sizes</Title>
					<div class="flex flex-wrap gap-4 items-center mt-4">
						<Button size="sm">Small</Button>
						<Button size="md">Medium</Button>
						<Button size="lg">Large</Button>
					</div>
				</div>
				
				<div>
					<Title level={4}>States</Title>
					<div class="flex flex-wrap gap-4 mt-4">
						<Button>Normal</Button>
						<Button disabled>Disabled</Button>
					</div>
				</div>
				
				<div>
					<Title level={4}>Full Width</Title>
					<div class="mt-4">
						<Button fullWidth>Full Width Button</Button>
					</div>
				</div>
			</div>
		</Card>
		
		<!-- Inputs Section -->
		<Card class="mb-12">
			<Title level={2}>Inputs</Title>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
				<div>
					<Title level={4}>Text Input</Title>
					<Input 
						label="Username" 
						name="username" 
						placeholder="Enter your username"
						bind:value={demoInput}
					/>
				</div>
				
				<div>
					<Title level={4}>Password Input</Title>
					<Input 
						type="password"
						label="Password" 
						name="password" 
						placeholder="Enter your password"
					/>
				</div>
				
				<div>
					<Title level={4}>Required Input</Title>
					<Input 
						label="Email" 
						name="email" 
						placeholder="Enter your email"
						required
					/>
				</div>
				
				<div>
					<Title level={4}>Disabled Input</Title>
					<Input 
						label="Disabled Field" 
						name="disabled" 
						placeholder="This field is disabled"
						disabled
						value="Disabled value"
					/>
				</div>
				
				<div>
					<Title level={4}>Input with Error</Title>
					<Input 
						label="Username" 
						name="error_username" 
						placeholder="Enter your username"
						error="This username is already taken"
					/>
				</div>
			</div>
		</Card>
		
		<!-- Form Section -->
		<Card class="mb-12">
			<Title level={2}>Form</Title>
			<div class="mt-6">
				<Form action="?/demo" useEnhance={false}>
					<Input 
						label="Username" 
						name="form_username" 
						placeholder="Enter your username"
						required
					/>
					<Input 
						type="password"
						label="Password" 
						name="form_password" 
						placeholder="Enter your password"
						required
					/>
					<div class="mt-6">
						<Button type="submit">Submit Form</Button>
					</div>
				</Form>
			</div>
		</Card>
		
		<!-- Titles Section -->
		<Card class="mb-12">
			<Title level={2}>Titles</Title>
			<div class="mt-6 space-y-6">
				<div>
					<Title level={1}>Heading 1</Title>
					<Title level={2}>Heading 2</Title>
					<Title level={3}>Heading 3</Title>
					<Title level={4}>Heading 4</Title>
					<Title level={5}>Heading 5</Title>
					<Title level={6}>Heading 6</Title>
				</div>
				
				<div>
					<Title level={2}>Alignment</Title>
					<Title level={4} align="left">Left Aligned</Title>
					<Title level={4} align="center">Center Aligned</Title>
					<Title level={4} align="right">Right Aligned</Title>
				</div>
				
				<div>
					<Title level={2}>Variants</Title>
					<Title level={4} variant="primary">Primary Title</Title>
					<Title level={4} variant="secondary">Secondary Title</Title>
				</div>
			</div>
		</Card>
		
		<!-- Cards Section -->
		<Card class="mb-12">
			<Title level={2}>Cards</Title>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
				<Card variant="default" padding="default">
					<Title level={4}>Default Card</Title>
					<p class="mt-2 text-stone-600 dark:text-stone-400">
						This is a default card with default padding.
					</p>
				</Card>
				
				<Card variant="parchment" padding="default">
					<Title level={4}>Parchment Card</Title>
					<p class="mt-2 text-stone-600 dark:text-stone-400">
						This is a parchment-styled card.
					</p>
				</Card>
				
				<Card variant="stone" padding="default">
					<Title level={4}>Stone Card</Title>
					<p class="mt-2 text-stone-600 dark:text-stone-400">
						This is a stone-styled card.
					</p>
				</Card>
			</div>
		</Card>
		
		<!-- Badges Section -->
		<Card class="mb-12">
			<Title level={2}>Badges</Title>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
				<div>
					<Title level={4}>Variants</Title>
					<div class="flex flex-wrap gap-4 mt-4">
						<Badge>Default</Badge>
						<Badge variant="success">Success</Badge>
						<Badge variant="warning">Warning</Badge>
						<Badge variant="danger">Danger</Badge>
						<Badge variant="info">Info</Badge>
					</div>
				</div>
				
				<div>
					<Title level={4}>Outline</Title>
					<div class="flex flex-wrap gap-4 mt-4">
						<Badge outline>Default</Badge>
						<Badge variant="success" outline>Success</Badge>
						<Badge variant="warning" outline>Warning</Badge>
						<Badge variant="danger" outline>Danger</Badge>
						<Badge variant="info" outline>Info</Badge>
					</div>
				</div>
				
				<div>
					<Title level={4}>Sizes</Title>
					<div class="flex flex-wrap gap-4 items-center mt-4">
						<Badge size="sm">Small</Badge>
						<Badge size="md">Medium</Badge>
						<Badge size="lg">Large</Badge>
					</div>
				</div>
				
				<div>
					<Title level={4}>Shapes</Title>
					<div class="flex flex-wrap gap-4 mt-4">
						<Badge rounded>Rounded</Badge>
						<Badge rounded={false}>Square</Badge>
					</div>
				</div>
			</div>
		</Card>
	</div>
</div>
