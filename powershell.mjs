import { PowerShell } from 'node-powershell';

const powershellInstance = async (message) => {
  const ps = new PowerShell({
    debug: true,
    executableOptions: {
      '-ExecutionPolicy': 'Bypass',
      '-NoProfile': true,
    },
  });

  try {
    const scriptCommand = PowerShell.command`. ./script.ps1 -message ${message}`;
    const result = await ps.invoke(scriptCommand);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await ps.dispose();
  }
};

export default powershellInstance;
