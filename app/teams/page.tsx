"use client";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { Header } from "../components/Header";

export default function teamsPage() {
  return (
    <div>
      <Header title="Your Teams" />
      <section className="w-full">
        <div className="ml-auto">
          <Link href="/teams/create">
            <Button color="primary" type="button" variant="contained">
              Create Project
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
