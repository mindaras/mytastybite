import { CMSPage } from "@common/components/page/CMSPage";
import { api } from "@common/utils/api/server";
import styles from "./Dashboard.module.scss";

interface DashboardResponse {
  blockList: Record<string, number>;
  crawlers: Record<string, number>;
  noIpCount: number;
}

interface Props {
  lang: string;
}

/* @ts-expect-error Async Server Component */
const Dashboard: React.FC<Props> = async () => {
  const { blockList, crawlers, noIpCount } = await api.get<DashboardResponse>(
    "/cms/dashboard"
  );

  return (
    <CMSPage>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <div>
            <h3>Blocked ips</h3>
            <ul>
              {Object.entries(blockList).map(([ip, count]) => (
                <li key={ip}>
                  {ip}: {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.block}>
          <div>
            <h3>Crawler visits</h3>
            <ul>
              {Object.entries(crawlers).map(([crawler, count]) => (
                <li key={crawler}>
                  {crawler}: {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.block}>
          <div>
            <h3>Non tracked ips</h3>
            <div>{noIpCount}</div>
          </div>
        </div>
      </div>
    </CMSPage>
  );
};

export { Dashboard };
