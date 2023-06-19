import Link from "next/link";

export default function Home() {
	return (
		<div>
			<h1 className="text-center mb-4">Gotta cache &apos;em all</h1>
			<Link href={"/pokemons/bulbasaur"} className="link-ligth">Bulbasaur</Link>
		</div>
	)
}
