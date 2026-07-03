const protectedRoutes = ["/dashboard.html", "/builder.html"];
const adminRoutes = ["/admin.html"];

const getAccessToken = () => localStorage.getItem("access_token") ?? null;
const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const redirect = (url) => {
  window.location.href = url;
};

const isRouteProtected = protectedRoutes.includes(window.location.pathname);
const isAdminRoute = adminRoutes.includes(window.location.pathname);

const userRole = getCurrentUser()?.role?.toLowerCase();
const isAdmin = userRole === "admin";
const hasToken = !!getAccessToken();

console.log(isAdmin);

(() => {
  // unauthenticated user on any protected or admin page → login
  if ((isRouteProtected || isAdminRoute) && !hasToken) {
    return redirect("auth.html");
  }

  // non-admin user trying to access admin page → dashboard
  if (isAdminRoute && hasToken && !isAdmin) {
    return redirect("dashboard.html");
  }

  // logged in user on auth page → redirect based on role
  if (!isRouteProtected && !isAdminRoute && hasToken) {
    return redirect(isAdmin ? "admin.html" : "dashboard.html");
  }

  // unauthenticated user on admin page → redirect to login
if (isAdmin && hasToken && isRouteProtected) {
  return redirect("admin.html");
}

})();