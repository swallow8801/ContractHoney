import { NextRequest, NextResponse } from "next/server";
import { NodeSSH } from "node-ssh";
import path from "path";

export async function GET(req: NextRequest) {
  // URL 객체로 변환
  const url = new URL(req.url);
  const hwpFileName = url.searchParams.get("fileName");

  if (!hwpFileName) {
    return NextResponse.json({ error: "File name is required" }, { status: 400 });
  }

  const hwpFilePath = `/home/username/downloads/${hwpFileName}`; // VM 경로 수정
  const pdfFileName = hwpFileName.replace(".hwp", ".pdf");
  const pdfFilePath = `/home/username/documents/${pdfFileName}`;

  // Azure VM 접속 정보
  const vmIp = "52.141.27.168";
  const vmUser = "Aivle"; // VM 사용자
  const vmPassword = "Aivle12345678"; // VM 비밀번호

  const powerShellScript = `
    Start-Process "C:\\Program Files (x86)\\HNC\\Office 2022\\HOffice120\\Bin\\Hwp.exe" -ArgumentList "${hwpFilePath}";
    Start-Sleep -Seconds 5;
    Start-Process -FilePath "C:\\Program Files (x86)\\HNC\\Office 2022\\HOffice120\\Bin\\Hwp.exe" -ArgumentList "/p /t '${hwpFilePath}' 'cutePDF Writer'";
    Start-Process "C:\\Users\\Aivle\\Documents\\AutoHotkey\\HWPTOPDF.ahk";
  `;

  try {
    const ssh = new NodeSSH();
    await ssh.connect({
      host: vmIp,
      username: vmUser,
      password: vmPassword,
    });

    const result = await ssh.execCommand(`powershell -Command "${powerShellScript}"`);

    if (result.code === 0) {
      return NextResponse.json({
        message: "PDF generated successfully",
        pdfFilePath,
        pdfFileName,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to generate PDF", details: result.stderr },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error connecting to Azure VM:", error);
    return NextResponse.json({ error: "Failed to connect to Azure VM", details: error }, { status: 500 });
  }
}
