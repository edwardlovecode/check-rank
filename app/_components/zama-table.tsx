"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @next/next/no-async-client-component
export default function ZamaTable() {
  const [data, setData] = useState([]);
  const [option, setOptions] = useState("day");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchAll() {
    setLoading(true);
    setError(null);

    try {
      const totalPages = 15;
      const results = [];

      for (let p = 1; p <= totalPages; p++) {
        const url = `https://leaderboard-bice-mu.vercel.app/api/zama?timeframe=month&sortBy=mindshare&page=${p}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch page " + p);
        const json = await res.json();
        results.push(...json.data);
      }

      setData(results);
    } catch (e) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAll();
  }, [option]);

  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center mb-8">
        <Button
          variant="outline"
          className={option === "day" && "bg-amber-500"}
          onClick={() => setOptions("day")}
        >
          24h
        </Button>
        <Button
          className={option === "week" && "bg-amber-500"}
          variant="outline"
          onClick={() => setOptions("week")}
        >
          7d
        </Button>
        <Button
          className={option === "month" && "bg-amber-500"}
          variant="outline"
          onClick={() => setOptions("month")}
        >
          30d
        </Button>
      </div>
      <Table>
        <TableCaption>
          {loading && (
            <div className="w-full h-12 flex justify-center items-center text-amber-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-3 size-5 animate-spin text-center "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Processing…
            </div>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead className="w-[100px]">X Username</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Mindshare (+)</TableHead>
            <TableHead className="text-right">Mindshare Delta(-)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading &&
            data &&
            data.map((i, index) => (
              // eslint-disable-next-line react/jsx-key
              <TableRow key={index}>
                <TableCell className="font-medium text-yellow-500">
                  {i.rank}
                </TableCell>
                <TableCell className="text-pink-600">{i.username}</TableCell>
                <TableCell className="text-blue-500">{i.displayName}</TableCell>
                <TableCell className="text-green-500">{i.mindshare}</TableCell>
                <TableCell className="text-right text-red-500">
                  {i.mindshareDelta}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
function fetchData() {
  throw new Error("Function not implemented.");
}
