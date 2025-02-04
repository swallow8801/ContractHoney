"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image";
import SwiperGroup from "../../component/Swiper/Swiper"
import {
  Container,
  Group,
  Title,
  InputContainer,
  Button,
  Notice,
  NoticeItem,
  NoticeItemTitle,
  NoticeItemDate,
  ViewAll,
  FileUploadContainer,
  FileUploadArea,
  FileInput,
  FileName,
  SearchInput,
  Select,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
  DropdownContainer,
  DropdownSearch,
  NewContractButton,
  ContractList,
  ContractItem,
  ContractTitle,
  ContractVersion,
  NewContractInput,
  CustomSelect,
  SelectTrigger,
  WarningMessage,
} from "./main.styled"
import Footer from "../../component/Footer/Footer"
import { Plus, ChevronDown } from "lucide-react"

interface NoticeType {
  notice_id: number
  notice_title: string
  notice_date: string
}

interface UserContractType {
  id: number | string
  title: string
  version: number
}

const MainPage = () => {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [searchType, setSearchType] = useState("법령")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [notices, setNotices] = useState<NoticeType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userContracts, setUserContracts] = useState<UserContractType[]>([])
  const [selectedContract, setSelectedContract] = useState<UserContractType | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [contractSearch, setContractSearch] = useState("")
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [newContractName, setNewContractName] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isContractSelected, setIsContractSelected] = useState(false)
  const [duplicateNameWarning, setDuplicateNameWarning] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    setIsLoggedIn(!!token)

    if (token) {
      fetchUserContracts()
    }

    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/mainpage_notices")
        if (!response.ok) {
          throw new Error("Failed to fetch notices")
        }
        const data: NoticeType[] = await response.json()
        setNotices(data)
      } catch (err: any) {
        setError(err.message)
      }
    }

    fetchNotices()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        setIsCreatingNew(false)
        setNewContractName("") // Reset the new contract name
        setDuplicateNameWarning(null) // Clear any existing warning
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchUserContracts = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("/api/user-contracts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch user contracts")
      }
      const data = await response.json()
      setUserContracts(data)
    } catch (err: any) {
      console.error("Error fetching user contracts:", err)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && selectedContract) {
      const fileExtension = file.name.split(".").pop() || ""
      const newFileName = `${selectedContract.title}.${fileExtension}`
      const newFile = new File([file], newFileName, { type: file.type })
      setSelectedFile(newFile)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
    if (isLoggedIn && isContractSelected) {
      const file = event.dataTransfer.files?.[0]
      if (file && selectedContract) {
        const fileExtension = file.name.split(".").pop() || ""
        const newFileName = `${selectedContract.title}.${fileExtension}`
        const newFile = new File([file], newFileName, { type: file.type })
        setSelectedFile(newFile)
      }
    }
  }

  const handleUploadClick = () => {
    if (isLoggedIn && isContractSelected) {
      fileInputRef.current?.click()
    }
  }

  const handleSearch = () => {
    if (searchType === "법령") {
      router.push(searchQuery.trim() ? `/law?search=${searchQuery}` : "/law"); // 검색어 없으면 전체 목록
    } else if (searchType === "표준계약서") {
      router.push(searchQuery.trim() ? `/archive?search=${searchQuery}` : "/archive"); // 검색어 없으면 전체 목록
    }
  };

  const handleReview = async () => {
    if (isLoggedIn && selectedFile && isContractSelected) {
      setIsLoading(true)
      const fileName = selectedFile.name
      const fileExtension = fileName.split(".").pop() || ""
      const fileNameWithoutExtension = fileName.replace(`.${fileExtension}`, "")

      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("fileName", fileNameWithoutExtension)
      formData.append("fileType", fileExtension)

      if (selectedContract) {
        if (selectedContract.id === "new") {
          formData.append("newContractTitle", selectedContract.title)
        } else {
          formData.append("contractId", selectedContract.id.toString())
          formData.append("version", selectedContract.version.toString())
        }
      }

      try {
        const token = localStorage.getItem("authToken")
        const response = await fetch("/api/upload-contract", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to upload contract")
        }

        const data = await response.json()
        setIsLoading(false)
        router.push(`/analysis?contractId=${data.contractId}`)
      } catch (error) {
        console.error("Error uploading contract:", error)
        setIsLoading(false)
        setError("Failed to upload contract. Please try again.")
      }
    }
  }

  const handleNoticeClick = (id: number) => {
    router.push(`/notice/${id}`)
  }

  const filteredContracts = userContracts
    .filter((contract) => contract.title.toLowerCase().includes(contractSearch.toLowerCase()))
    .reduce((acc, contract) => {
      const existingContract = acc.find((c) => c.title === contract.title)
      if (!existingContract || existingContract.version < contract.version) {
        return [...acc.filter((c) => c.title !== contract.title), contract]
      }
      return acc
    }, [] as UserContractType[])

  const handleNewContractSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newContractName.trim()) {
      const isDuplicate = userContracts.some(
        (contract) => contract.title.toLowerCase() === newContractName.trim().toLowerCase(),
      )
      if (isDuplicate) {
        setDuplicateNameWarning("이미 사용 중인 계약서 이름입니다. 다른 이름을 선택해주세요.")
      } else {
        const newContract = {
          id: "new",
          title: newContractName.trim(),
          version: 0, // Change this to 0 to indicate it's a new contract
        }
        setSelectedContract(newContract)
        setIsContractSelected(true)
        setSelectedFile(null)
        setIsCreatingNew(false)
        setIsDropdownOpen(false)
        setNewContractName("")
        setDuplicateNameWarning(null)
      }
    }
  }

  return (
    <Container>
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
          <LoadingText>계약서를 분석 중입니다...</LoadingText>
        </LoadingOverlay>
      )}
      {!isLoggedIn ? (
        <Group
          style={{
            flexDirection: "row",
            background: "linear-gradient(#FFF9E5,rgb(250, 231, 172))", // Light yellow background
          }}
        >
          <Group
            style={{
              width: "40%",
              padding: "0 50px",
              marginTop: "10%",
              justifyContent: "start",
              alignItems: "flex-start",
              backgroundColor: "transparent",
            }}
          >
            <Title
              style={{
                color: "#F2B024", // Yellow color
                fontSize: "48px",
                fontWeight: "bold",
                textAlign: "left",
                marginBottom: "30px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              계꿀
            </Title>
            <Title
              style={{
                color: "#34495E",
                fontSize: "24px",
                lineHeight: "1.6",
                textAlign: "left",
                fontWeight: "normal",
                marginBottom: "40px",
              }}
            >
              계약서 분석을 보다 쉽게 하세요.
              <br />
              계꿀이 위법조항과 독소조항에 대한
              <br />
              판단을 도와줄 거예요.
            </Title>
            <Button
              style={{
                backgroundColor: "#F2B024", // Yellow color
                padding: "15px 30px",
                fontSize: "18px",
                borderRadius: "30px",
                boxShadow: "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
                transition: "all 0.3s",
                color: "#FFFFFF",
              }}
              onClick={() => router.push("/login")}
            >
              시작하기
            </Button>
          </Group>
          <div
            style={{
              width: "60%",
              overflow: "hidden",
              borderRadius: "20px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              marginRight: "20px", // Add right margin
            }}
          >
            <SwiperGroup />
          </div>
        </Group>
      ) : (
        <Group
          style={{
            background: "linear-gradient(#FFF9E5, rgb(250, 231, 172))",
            position: "relative"
          }}
        >
        <Image
          src="/images/계약서.png"
          alt="계약서"
          width={400}
          height={400} 
          style={{
            position: "absolute",
            top: "5vh",
            left: "7vw",
            width: "30vw",
            maxWidth: "500px",
            height: "auto",
            transform: "rotate(10deg)",
            zIndex: 10,
          }}
        />
          <Title style={{color:"#F2B024"}}>계약서 분석 AI 어시스턴트</Title>
          <InputContainer>
            <CustomSelect>
              <SelectTrigger onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <span>
                  {selectedContract
                    ? selectedContract.id === "new"
                      ? `${selectedContract.title} (New)`
                      : `${selectedContract.title} (ver.${selectedContract.version})`
                    : "계약서 선택"}
                </span>
                <ChevronDown size={20} />
              </SelectTrigger>

              {isDropdownOpen && (
                <DropdownContainer ref={dropdownRef}>
                  <DropdownSearch
                    placeholder="기존 계약서 검색..."
                    value={contractSearch}
                    onChange={(e) => setContractSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />

                  {isCreatingNew && (
                    <form onSubmit={handleNewContractSubmit}>
                      <NewContractInput
                        placeholder="새 계약서 이름 입력"
                        value={newContractName}
                        onChange={(e) => setNewContractName(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                        $hasWarning={!!duplicateNameWarning}
                      />
                      {duplicateNameWarning && <WarningMessage>{duplicateNameWarning}</WarningMessage>}
                    </form>
                  )}
                  {!isCreatingNew && (
                    <NewContractButton
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsCreatingNew(true)
                      }}
                    >
                      <Plus size={16} />
                      새로 만들기
                    </NewContractButton>
                  )}

                  <ContractList>
                    {filteredContracts.map((contract) => (
                      <ContractItem
                        key={contract.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedContract(contract)
                          setIsContractSelected(true)
                          setSelectedFile(null)
                          setIsDropdownOpen(false)
                        }}
                        className={contract.id === "new" ? "new" : ""}
                      >
                        <ContractTitle>{contract.title}</ContractTitle>
                        <ContractVersion className={contract.id === "new" ? "new" : ""}>
                          {contract.id === "new" ? "New" : `ver.${contract.version}`}
                        </ContractVersion>
                      </ContractItem>
                    ))}
                  </ContractList>
                </DropdownContainer>
              )}
            </CustomSelect>
            <FileUploadContainer>
              <FileUploadArea
                $isDragging={isDragging}
                onClick={handleUploadClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                $disabled={!isContractSelected}
              >
                {isContractSelected ? (
                  selectedFile ? (
                    <FileName>{selectedFile.name}</FileName>
                  ) : (
                    "클릭하거나 파일을 드래그하여 업로드하세요"
                  )
                ) : (
                  "계약서를 선택해주세요"
                )}
              </FileUploadArea>
              <FileInput
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".hwp"
              />
            </FileUploadContainer>
            <Button onClick={handleReview} disabled={!isContractSelected || !selectedFile || isLoading}>
              검토하기
            </Button>
          </InputContainer>
        </Group>
      )}

      <Group
        style={{
          background: "linear-gradient(rgb(250, 231, 172),rgb(253, 214, 130))",
          position: "relative"
        }}
      >
        <Image
          src="/images/법.png"
          alt="법"
          width={400}
          height={400} 
          style={{
            position: "absolute",
            top: "5vh",
            right: "7vw",
            width: "30vw",
            maxWidth: "500px",
            height: "auto",
            zIndex: 10,
          }}
        />
        <Title>법령 & 표준계약서 조회</Title>
        <InputContainer>
          <Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option>법령</option>
            <option>표준계약서</option>
          </Select>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch}>검색</Button>
        </InputContainer>
      </Group>

      <Group
        style={{
          background: "linear-gradient(rgb(253, 214, 130),rgb(243, 191, 79))",
          position: "relative"
        }}
      >
        <Image
          src="/images/공지.png"
          alt="공지사항"
          width={400}
          height={400}
          style={{
            position: "absolute",
            top: "5vh",
            left: "7vw",
            width: "30vw",
            maxWidth: "500px",
            height: "auto",
            transform: "rotate(-10deg) scaleX(-1)",
            zIndex: 10,
          }}
        />

        <Title>공지사항</Title>
        <Notice>
          {isLoading ? (
            <LoadingText>로딩 중...</LoadingText>
          ) : error ? (
            <p>공지사항을 불러오는 중 오류가 발생했습니다: {error}</p>
          ) : (
            notices.map((notice) => (
              <NoticeItem key={notice.notice_id} onClick={() => handleNoticeClick(notice.notice_id)}>
                <NoticeItemTitle>{notice.notice_title}</NoticeItemTitle>
                <NoticeItemDate>{new Date(notice.notice_date).toLocaleDateString()}</NoticeItemDate>
              </NoticeItem>
            ))
          )}
          <ViewAll onClick={() => router.push("/notice")}>{"전체보기\u00A0\u00A0\u00A0>"}</ViewAll>
        </Notice>
      </Group>
      <Footer/>
    </Container>
  )
}

export default MainPage

