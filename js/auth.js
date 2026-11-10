(function () {
  'use strict';

  async function requireAuthentication() {

    if (!window.supabaseClient) {
      console.error(
        '[AUTH] Supabase client is not available.'
      );

      window.location.replace('./login.html');
      return false;
    }

    try {

      const {
        data,
        error
      } = await window.supabaseClient.auth.getSession();

      if (error) {
        console.error(
          '[AUTH] Session check failed:',
          error
        );

        window.location.replace('./login.html');
        return false;
      }

      if (!data || !data.session) {
        console.warn(
          '[AUTH] No active session. Redirecting to login.'
        );

        window.location.replace('./login.html');
        return false;
      }

      console.log(
        '[AUTH] Authenticated:',
        data.session.user.email
      );

      return true;

    } catch (error) {

      console.error(
        '[AUTH] Authentication check exception:',
        error
      );

      window.location.replace('./login.html');
      return false;
    }
  }

  async function logoutDashboard() {

    const logoutButton =
      document.getElementById('btnLogout');

    if (logoutButton) {
      logoutButton.disabled = true;
      logoutButton.textContent = 'LOGGING OUT...';
    }

    try {

      if (!window.supabaseClient) {
        console.error(
          '[AUTH] Supabase client unavailable during logout.'
        );

        window.location.replace('./login.html');
        return;
      }

      const {
        error
      } = await window.supabaseClient.auth.signOut();

      if (error) {
        console.error(
          '[AUTH] Logout failed:',
          error
        );

        if (logoutButton) {
          logoutButton.disabled = false;
          logoutButton.textContent = 'LOGOUT';
        }

        alert(
          'Logout failed. Please try again.'
        );

        return;
      }

      console.log(
        '[AUTH] Logout successful.'
      );

      window.location.replace('./login.html');

    } catch (error) {

      console.error(
        '[AUTH] Logout exception:',
        error
      );

      if (logoutButton) {
        logoutButton.disabled = false;
        logoutButton.textContent = 'LOGOUT';
      }

      alert(
        'Unable to logout. Please try again.'
      );
    }
  }

  window.requireAuthentication =
    requireAuthentication;

  window.logoutDashboard =
    logoutDashboard;

})();
