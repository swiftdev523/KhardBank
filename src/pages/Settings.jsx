import { useState } from "react";
import { ShieldCheck, KeyRound, Smartphone } from "lucide-react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/layout/TopBar";
import PageContainer from "../components/layout/PageContainer";
import ToggleSwitch from "../components/shared/ToggleSwitch";

export default function Settings() {
  const { user } = useApp();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weeklySummary: true,
  });
  const [twoFactor, setTwoFactor] = useState(true);

  const memberSince = new Date(
    `${user.memberSince}T00:00:00`,
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <TopBar
        title="Settings"
        subtitle="Manage your profile, notifications, and security"
      />
      <PageContainer className="space-y-6">
        <section className="card p-6 md:p-7">
          <h2 className="font-serif text-lg font-semibold text-ink mb-5">
            Profile
          </h2>
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brass/15 text-xl font-semibold text-brass">
              {user.initials}
            </span>
            <div>
              <p className="font-medium text-ink">{user.name}</p>
              <p className="text-sm text-slate">{user.email}</p>
              <p className="text-xs text-slate mt-1">
                Member since {memberSince}
              </p>
            </div>
          </div>
        </section>

        <section className="card p-6 md:p-7">
          <h2 className="font-serif text-lg font-semibold text-ink mb-2">
            Notifications
          </h2>
          <div className="divide-y divide-slate/10">
            <ToggleSwitch
              id="notif-email"
              label="Email notifications"
              description="Receive account activity by email."
              checked={notifications.email}
              onChange={(v) =>
                setNotifications((prev) => ({ ...prev, email: v }))
              }
            />
            <ToggleSwitch
              id="notif-push"
              label="Push notifications"
              description="Get alerts on your mobile device."
              checked={notifications.push}
              onChange={(v) =>
                setNotifications((prev) => ({ ...prev, push: v }))
              }
            />
            <ToggleSwitch
              id="notif-sms"
              label="SMS alerts"
              description="Text messages for large transactions."
              checked={notifications.sms}
              onChange={(v) =>
                setNotifications((prev) => ({ ...prev, sms: v }))
              }
            />
            <ToggleSwitch
              id="notif-summary"
              label="Weekly summary"
              description="A digest of your spending every Monday."
              checked={notifications.weeklySummary}
              onChange={(v) =>
                setNotifications((prev) => ({ ...prev, weeklySummary: v }))
              }
            />
          </div>
        </section>

        <section className="card p-6 md:p-7">
          <h2 className="font-serif text-lg font-semibold text-ink mb-2">
            Security
          </h2>
          <div className="divide-y divide-slate/10">
            <ToggleSwitch
              id="two-factor"
              label="Two-factor authentication"
              description="Require a verification code at sign in."
              checked={twoFactor}
              onChange={setTwoFactor}
            />
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-paper p-2 text-slate">
                  <KeyRound size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">Password</p>
                  <p className="text-xs text-slate">
                    Last changed 3 months ago.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => console.log("Change password requested")}
                className="rounded-lg border border-slate/20 px-3 py-2 text-sm font-medium text-ink hover:bg-paper transition-colors">
                Change
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-paper p-2 text-slate">
                  <Smartphone size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">
                    Active sessions
                  </p>
                  <p className="text-xs text-slate">
                    2 devices currently signed in.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => console.log("Manage sessions requested")}
                className="rounded-lg border border-slate/20 px-3 py-2 text-sm font-medium text-ink hover:bg-paper transition-colors">
                Manage
              </button>
            </div>
            <div className="flex items-center gap-3 py-3">
              <span className="rounded-lg bg-success/10 p-2 text-success">
                <ShieldCheck size={16} aria-hidden="true" />
              </span>
              <p className="text-xs text-slate">
                Your account security is in good standing.
              </p>
            </div>
          </div>
        </section>
      </PageContainer>
    </>
  );
}
