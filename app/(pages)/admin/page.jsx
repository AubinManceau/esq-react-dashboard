"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Users } from "lucide-react";
import { getUsers } from "@/app/utils/user";

export default function Dashboard() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const [stats, setStats] = useState({
    seniors: 0,
    jeunes: 0,
    feminines: 0,
    veterans: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const dataSenior = await getUsers({ roles: [1], categories: [7] });
      const dataJeune = await getUsers({ roles: [1], categories: [1, 2, 3, 4, 5, 6] });
      const dataFeminine = await getUsers({ roles: [1], categories: [10] });
      const dataVeteran = await getUsers({ roles: [1], categories: [8] });

      setStats({
        seniors: dataSenior?.data?.length || 0,
        jeunes: dataJeune?.data?.length || 0,
        feminines: dataFeminine?.data?.length || 0,
        veterans: dataVeteran?.data?.length || 0,
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Séniors", "Jeunes", "Féminines", "Vétérans"],
        datasets: [
          {
            label: "Joueurs",
            data: [stats.seniors, stats.jeunes, stats.feminines, stats.veterans],
            backgroundColor: [
              "rgba(108, 83, 78, 1)",
              "rgba(252, 110, 17, 1)",
              "rgba(166, 127, 142, 1)",
              "rgba(0, 0, 102, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, [stats]);

  return (
    <div className="admin-home">
      <div className="flex flex-col gap-8 w-full lg:w-6/10">
        <div className="welcome-card lg:h-2/8 h-full">
          <h2 className="!mb-6">
            <span>Bonjour,</span> Aubin Manceau !
          </h2>
          <p>Bienvenue sur votre tableau de bord.</p>
          <p>
            Cet espace est dédié à la gestion des membres de l'Etoile Sportive
            Quelainaise.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:h-6/8">
          <div className="chart-card">
            <h4>Nombre de joueurs par catégorie</h4>
            {stats.seniors + stats.jeunes + stats.feminines + stats.veterans === 0 ? (
              <p className="h-full min-h-[350px] flex items-center justify-center">Aucun joueur enregistré.</p>
            ) : (
              <canvas className="lg:!max-h-[600px] !max-h-[350px]" ref={chartRef}></canvas>
            )}
          </div>

          <div className="grid grid-cols-2 s:grid-cols-4 lg:flex lg:flex-col gap-4 lg:w-3/8">
            <div className="number-card">
              <div className="flex gap-2 md:gap-4 flex-col items-center md:items-start md:flex-row">
                <div className="p-2 bg-[#6C534E] rounded-[5px] text-white w-fit">
                  <Users height={16} width={16} />
                </div>
                <div className="flex flex-col">
                  <p className="category">Séniors</p>
                  <p className="number-text">{stats.seniors}</p>
                </div>
              </div>
            </div>
            <div className="number-card">
              <div className="flex gap-2 md:gap-4 flex-col items-center md:items-start md:flex-row">
                <div className="p-2 bg-orange rounded-[5px] text-white w-fit">
                  <Users height={16} width={16} />
                </div>
                <div className="flex flex-col">
                  <p className="category">Jeunes</p>
                  <p className="number-text">{stats.jeunes}</p>
                </div>
              </div>
            </div>
            <div className="number-card">
              <div className="flex gap-2 md:gap-4 flex-col items-center md:items-start md:flex-row">
                <div className="p-2 bg-[#A67F8E] rounded-[5px] text-white w-fit">
                  <Users height={16} width={16} />
                </div>
                <div className="flex flex-col">
                  <p className="category">Féminines</p>
                  <p className="number-text">{stats.feminines}</p>
                </div>
              </div>
            </div>
            <div className="number-card">
              <div className="flex gap-2 md:gap-4 flex-col items-center md:items-start md:flex-row">
                <div className="p-2 bg-bleu rounded-[5px] text-white w-fit">
                  <Users height={16} width={16} />
                </div>
                <div className="flex flex-col">
                  <p className="category">Vétérans</p>
                  <p className="number-text">{stats.veterans}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full lg:w-4/10">
        <div className="test-card">
          <h2>??</h2>
        </div>
        <div className="notif-card">
          <h2>Notifications</h2>
        </div>
      </div>
    </div>
  );
}
