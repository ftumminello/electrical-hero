import { getCompany, getCurrentUser, getHistory, getJobSiteProgress, getLeaderboard } from "@/lib/api/queries";
import { HomeView } from "@/features/home/views/home-view";

export default async function HomePage() {
  const [user, { company, currentJobSite }, leaderboard, recentAttempts] = await Promise.all([
    getCurrentUser(),
    getCompany(),
    getLeaderboard(),
    getHistory(3),
  ]);
  const progress = await getJobSiteProgress(currentJobSite.id);
  const rank = leaderboard.find((entry) => entry.userId === user.id)?.rank ?? leaderboard.length;

  return (
    <HomeView
      user={user}
      rank={rank}
      company={company}
      currentJobSite={currentJobSite}
      progress={progress}
      recentAttempts={recentAttempts}
    />
  );
}
