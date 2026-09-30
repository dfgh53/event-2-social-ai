import React, { useState } from 'react';
import { SocialAccount, SocialPlatform } from '../types';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  X,
  ExternalLink
} from 'lucide-react';

interface ConnectedAccountsProps {
  accounts: SocialAccount[];
  onToggleConnect: (accountId: string) => void;
  isGlobalDemoMode: boolean;
  onToggleGlobalDemoMode: () => void;
}

export const ConnectedAccounts: React.FC<ConnectedAccountsProps> = ({
  accounts,
  onToggleConnect,
  isGlobalDemoMode,
  onToggleGlobalDemoMode,
}) => {
  const [showOAuthModal, setShowOAuthModal] = useState<SocialAccount | null>(null);

  const platformScopes: Record<SocialPlatform, string[]> = {
    linkedin: ['r_liteprofile', 'w_member_social', 'r_organization_social'],
    instagram: ['instagram_basic', 'instagram_content_publish', 'pages_read_engagement'],
    x: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    threads: ['threads_basic', 'threads_content_publish'],
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/90 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Connected Social Accounts</h2>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise OAuth token architecture. Secure server-side credential proxy with explicit Demo Mode fallback.
          </p>
        </div>

        {/* Global Demo Mode Toggle */}
        <button
          onClick={onToggleGlobalDemoMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer shadow-xs ${
            isGlobalDemoMode
              ? 'bg-amber-50 border-amber-200 text-amber-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          {isGlobalDemoMode ? (
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          )}
          <span>{isGlobalDemoMode ? 'Demo Mode Active' : 'Live Mode (Real OAuth Ready)'}</span>
        </button>
      </div>

      {/* Security Architecture Banner */}
      <div className="p-4 rounded-xl bg-white border border-slate-200/90 flex items-start gap-3 shadow-xs">
        <Lock className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-slate-900">OAuth Security & Access Token Boundary</p>
          <p className="text-slate-600 leading-relaxed">
            API secrets are strictly kept on the server side (`server.ts`). When social publishing APIs require production approval, Event2Social AI gracefully utilizes clearly-labeled Demo Mode rather than fabricating synthetic live publishes.
          </p>
        </div>
      </div>

      {/* Accounts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => {
          const scopes = platformScopes[account.platform] || [];
          return (
            <div
              key={account.id}
              className="p-5 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={account.avatarUrl}
                    alt={account.accountName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{account.accountName}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold uppercase border border-slate-200">
                        {account.platform}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{account.handle}</p>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border flex items-center gap-1.5 ${
                    account.connected
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${account.connected ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                  {account.connected ? (account.isDemo ? 'Demo Connected' : 'Live Connected') : 'Disconnected'}
                </span>
              </div>

              {/* Scopes */}
              <div className="space-y-1.5 text-[11px]">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Configured Scopes:
                </span>
                <div className="flex flex-wrap gap-1">
                  {scopes.map((scope) => (
                    <span
                      key={scope}
                      className="px-2 py-0.5 rounded bg-slate-50 font-mono text-slate-600 text-[10px] border border-slate-200"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] text-slate-500">
                  Last active: <strong className="text-slate-700">{account.lastActive}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowOAuthModal(account)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition cursor-pointer"
                  >
                    OAuth Info
                  </button>
                  <button
                    onClick={() => onToggleConnect(account.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      account.connected
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                        : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                    }`}
                  >
                    {account.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* OAuth Info Modal */}
      {showOAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">{showOAuthModal.accountName}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase font-semibold">
                  {showOAuthModal.platform}
                </span>
              </div>
              <button
                onClick={() => setShowOAuthModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>Handle:</strong> {showOAuthModal.handle}</p>
              <p><strong>Token Type:</strong> Bearer (OAuth 2.0 PKCE)</p>
              <p><strong>Permission Boundary:</strong> Client ID proxy via server-side session.</p>
              <div className="pt-2">
                <strong className="block mb-1 text-slate-800">Assigned Scopes:</strong>
                <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-slate-700">
                  {(platformScopes[showOAuthModal.platform] || []).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowOAuthModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
