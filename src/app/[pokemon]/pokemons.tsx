
"use client"

import Link from 'next/link';
import { Spinner, Form, Button } from 'react-bootstrap'
import Image from 'next/image';
import usePokemon from '@/hooks/usePokemon';
import { useSearchParams } from "next/navigation";
import { FormEvent } from 'react';
import * as PokemonApi from '@/network/pokemon.api'

interface PageProps {
    params: { pokemon: string },
}

export default function PokemonDetailsPage({ params: { pokemon } }: PageProps) {
    const searchParams = useSearchParams()!
    const page = searchParams.get('page')

    const { pokemonData, pokemonLoading, mutatePokemon } = usePokemon(pokemon)

    async function handleSubmitNickname(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        const nickname = formData.get("nickname")?.toString().trim()

        if (!pokemonData || !nickname) return;

        const update = await PokemonApi.setNickname(pokemonData, nickname)
        mutatePokemon(update, { revalidate: false });
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <p><Link href={`/?page=${page}`} className='link-light'>⬅️ PokeDex</Link></p>
            {pokemonLoading && <Spinner animation="grow" />}
            {pokemonData === null && <p>Pokemon not found</p>}
            {pokemonData &&
                <>
                    <h1 className='text-center text-capitalize'>{pokemonData.name}</h1>
                    <Image
                        src={pokemonData.sprites.other['official-artwork'].front_default}
                        alt={"Pokemon: " + pokemonData.name}
                        width={400}
                        height={400}
                    />
                    <div className='d-inline-block mt-2'>
                        <div><strong>Types: </strong>{pokemonData.types.map(type => type.type.name).join(", ")}</div>
                        <div><strong>Height: </strong>{pokemonData.height * 10} cm</div>
                        <div><strong>Weight: </strong>{pokemonData.weight / 10} kg</div>
                    </div>
                    <Form onSubmit={handleSubmitNickname} className="mt-4" >
                        <Form.Group controlId='pokemon-nickname-input' className='mb-3'>
                            <Form.Label>Give this Pokemon a nickname</Form.Label>
                            <Form.Control name='nickname' placeholder='E.g. Ferdinand' />
                        </Form.Group>
                        <Button type="submit">Set nickname</Button>
                    </Form>
                </>}
        </div>
    );
}