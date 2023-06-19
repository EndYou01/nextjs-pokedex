"use client"

import PokemonEntry from "@/components/PokemonEntry";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useSWR from 'swr'
import * as PokemonApi from '@/network/pokemon.api'
import { Spinner, Row, Col, Button } from 'react-bootstrap'

export default function Home() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const page = searchParams.get('page') || "1";

	const { data, isLoading } = useSWR(["getPokemonPage", page], () => PokemonApi.getPokemonPage(parseInt(page)))

	if (isLoading) return <Spinner animation="border" className="d-block m-auto" />

	return (
		<div>
			<h1 className="text-center mb-4">Gotta cache &apos;em all</h1>

			<Row xs={1} sm={2} lg={3} xl={4} className="g-4">
				{
					data?.results.map(pokemonEntry => (
						<Col key={pokemonEntry.name}>
							<PokemonEntry name={pokemonEntry.name} />
						</Col>
					))
				}
			</Row>
			<div className="d-flex justify-content-center gap-2 mt-4">
				{data?.previous &&
					<Button onClick={() => {
						router.push(`/${pathname}?page=${parseInt(page) - 1}`)
					}}>
						Previous page
					</Button>
				}
				{data?.next &&
					<Button onClick={() => {
						router.push(`/${pathname}?page=${parseInt(page) + 1}`)
					}}>
						Next page
					</Button>
				}
			</div>
		</div>
	)
}
