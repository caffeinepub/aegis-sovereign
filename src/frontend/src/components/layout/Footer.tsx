import { Link } from '@tanstack/react-router';
import { SiX, SiLinkedin, SiGithub } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img src="/assets/generated/axon-logo.dim_800x800.png" alt="AXON" className="h-8 w-8" />
              <span className="text-lg font-bold">AXON</span>
            </div>
            <p className="text-sm text-gray-400">
              Sovereign Neural Defense for Corporate Intelligence
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/dashboard" className="hover:text-emerald-500 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/neural-lab" className="hover:text-emerald-500 transition-colors">
                  Neural Lab
                </Link>
              </li>
              <li>
                <Link to="/dashboard/sentinel" className="hover:text-emerald-500 transition-colors">
                  Sentinel Protocol
                </Link>
              </li>
              <li>
                <Link to="/dashboard/device-sync" className="hover:text-emerald-500 transition-colors">
                  Device Sync
                </Link>
              </li>
              <li>
                <Link to="/dashboard/analytics" className="hover:text-emerald-500 transition-colors">
                  Analytics Vault
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Technical Logs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Security Whitepaper
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Compliance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Data Processing
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>© {new Date().getFullYear()} AXON. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Built with ❤️ using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                window.location.hostname
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400 transition-colors"
            >
              caffeine.ai
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
              <SiX className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
              <SiLinkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
              <SiGithub className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
