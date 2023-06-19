
"use client"
import usePokemon from "@/hooks/usePokemon";
import Link from "next/link";
import styles from '@/styles/PokemonEntry.module.css'
import { Spinner } from 'react-bootstrap'
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function PokemonEntry({ name }: { name: string }) {
    const searchParams = useSearchParams()!
    const page = searchParams.get('page') || "1"
    const { pokemonData, pokemonLoading } = usePokemon(name)

    return (
        <Link href={`/${name}?page=${page}`}>
            <div className={styles.entry}>
                {pokemonLoading && <Spinner animation="grow" />}
                {pokemonData === null && <p>Pokemon not found</p>}
                {pokemonData &&
                    <div className={styles.card}>
                        <h1 className="text-center text-capitalize">{pokemonData.name}</h1>
                        <Image
                            src={pokemonData.sprites.other['official-artwork'].front_default}
                            alt={"Pokemon: " + pokemonData.name}
                            width={200}
                            height={200}
                        />
                    </div>}
            </div>
        </Link>

    );
}
