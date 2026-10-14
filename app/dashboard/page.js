"use client";
import _ from "lodash";
import { supabase } from "../../lib/supabase";

export default function Dashboard({ searchParams }) {
  const settings = _.merge({}, JSON.parse(searchParams.prefs || "{}"));
  // DEMO VULNERABILITY: user-controlled HTML rendered unescaped
  return <div dangerouslySetInnerHTML={{ __html: searchParams.welcome }} data-theme={settings.theme} />;
}
