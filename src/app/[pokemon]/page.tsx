

import { Metadata } from 'next';
import PokemonDetailsPage from './pokemons';

interface PageProps {
    params: { pokemon: string },
}

export function generateMetadata(
    { params: { pokemon } }: PageProps,
): Metadata {
    return {
        title: `${pokemon} - NextJS PokeDex`
    }
}

export default function Page({ params: { pokemon } }: PageProps) {

    return (
        <PokemonDetailsPage params={{ pokemon }} />
    );
}
