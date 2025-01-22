"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import {
  Container,
  Header,
  Title,
  VersionSelector,
  ComparisonContainer,
  VersionColumn,
  VersionTitle,
  Section,
  SectionTitle,
  ContentItem,
  NoDataMessage,
  BackButton,
  Select,
  TabContainer,
  Tab,
  DiffHighlight,
} from "./compare.styled"

interface ContractVersion {
  con_id: number
  con_version: number
  con_title: string
  con_updatetime: string
  summaries: {
    sum_article_number: number
    sum_article_title: string
    sum_summary: string
  }[]
  idens: {
    iden_article_number: number
    iden_clause_number: number | null
    iden_subclause_number: number | null
    iden_sentence: string
    iden_unfair: boolean
    iden_toxic: boolean
  }[]
}

interface GroupedClause {
  article: number
  clause: number | null
  subclause: number | null
  versions: {
    version: number
    sentence: string
    unfair: boolean
    toxic: boolean
  }[]
}

export default function ComparePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [versions, setVersions] = useState<ContractVersion[]>([])
  const [selectedVersions, setSelectedVersions] = useState<[number, number]>([0, 0])
  const [activeTab, setActiveTab] = useState<"summary" | "unfair" | "toxic">("summary")

  useEffect(() => {
    const contractId = searchParams.get("contractId")
    if (contractId) {
      fetchContractVersions(contractId)
    }
  }, [searchParams])

  const fetchContractVersions = async (contractId: string) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch(`/api/contracts/${contractId}/versions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch contract versions")
      }
      const data = await response.json()
      setVersions(data)
      if (data.length >= 2) {
        setSelectedVersions([data[0].con_version, data[1].con_version])
      }
    } catch (error) {
      console.error("Error fetching contract versions:", error)
    }
  }

  const handleVersionChange = (index: number, version: number) => {
    setSelectedVersions((prev) => {
      const newVersions = [...prev] as [number, number]
      newVersions[index] = version
      return newVersions
    })
  }

  const getVersionData = (version: number) => {
    return versions.find((v) => v.con_version === version)
  }

  const highlightDifferences = (text1: string, text2: string) => {
    const words1 = text1.split(" ")
    const words2 = text2.split(" ")
    const result: JSX.Element[] = []

    words1.forEach((word, index) => {
      if (word !== words2[index]) {
        result.push(
          <DiffHighlight key={index} $added={false}>
            {word}{" "}
          </DiffHighlight>,
        )
      } else {
        result.push(<span key={index}>{word} </span>)
      }
    })

    return result
  }

  const groupClauses = (version1: ContractVersion, version2: ContractVersion): GroupedClause[] => {
    const groupedClauses: GroupedClause[] = []

    const addToGroup = (iden: ContractVersion["idens"][0], version: number) => {
      const existingGroup = groupedClauses.find(
        (g) =>
          g.article === iden.iden_article_number &&
          g.clause === iden.iden_clause_number &&
          g.subclause === iden.iden_subclause_number,
      )

      if (existingGroup) {
        existingGroup.versions.push({
          version,
          sentence: iden.iden_sentence,
          unfair: iden.iden_unfair,
          toxic: iden.iden_toxic,
        })
      } else {
        groupedClauses.push({
          article: iden.iden_article_number,
          clause: iden.iden_clause_number,
          subclause: iden.iden_subclause_number,
          versions: [
            {
              version,
              sentence: iden.iden_sentence,
              unfair: iden.iden_unfair,
              toxic: iden.iden_toxic,
            },
          ],
        })
      }
    }

    version1.idens.forEach((iden) => addToGroup(iden, version1.con_version))
    version2.idens.forEach((iden) => addToGroup(iden, version2.con_version))

    return groupedClauses.sort(
      (a, b) => a.article - b.article || (a.clause ?? 0) - (b.clause ?? 0) || (a.subclause ?? 0) - (b.subclause ?? 0),
    )
  }

  if (versions.length === 0) {
    return <NoDataMessage>비교할 수 있는 버전이 없습니다.</NoDataMessage>
  }

  const version1 = getVersionData(selectedVersions[0])
  const version2 = getVersionData(selectedVersions[1])

  if (!version1 || !version2) {
    return <NoDataMessage>선택된 버전의 데이터를 찾을 수 없습니다.</NoDataMessage>
  }

  const groupedClauses = groupClauses(version1, version2)

  return (
    <Container>
      <Header>
        <Title>계약서 버전 비교</Title>
        <VersionSelector>
          <Select value={selectedVersions[0]} onChange={(e) => handleVersionChange(0, Number(e.target.value))}>
            {versions.map((version) => (
              <option key={version.con_version} value={version.con_version}>
                버전 {version.con_version}
              </option>
            ))}
          </Select>
          <span>vs</span>
          <Select value={selectedVersions[1]} onChange={(e) => handleVersionChange(1, Number(e.target.value))}>
            {versions.map((version) => (
              <option key={version.con_version} value={version.con_version}>
                버전 {version.con_version}
              </option>
            ))}
          </Select>
        </VersionSelector>
        <TabContainer>
          <Tab $active={activeTab === "summary"} onClick={() => setActiveTab("summary")}>
            요약
          </Tab>
          <Tab $active={activeTab === "unfair"} onClick={() => setActiveTab("unfair")}>
            불공정 조항
          </Tab>
          <Tab $active={activeTab === "toxic"} onClick={() => setActiveTab("toxic")}>
            독소 조항
          </Tab>
        </TabContainer>
      </Header>

      <ComparisonContainer>
        {activeTab === "summary" && (
          <>
            <VersionColumn>
              <VersionTitle>버전 {selectedVersions[0]}</VersionTitle>
              <Section>
                <SectionTitle>요약</SectionTitle>
                {version1.summaries.map((summary, i) => (
                  <ContentItem key={i}>
                    <strong>
                      {summary.sum_article_number}조: {summary.sum_article_title}
                    </strong>
                    <p>{highlightDifferences(summary.sum_summary, version2.summaries[i]?.sum_summary || "")}</p>
                  </ContentItem>
                ))}
              </Section>
            </VersionColumn>
            <VersionColumn>
              <VersionTitle>버전 {selectedVersions[1]}</VersionTitle>
              <Section>
                <SectionTitle>요약</SectionTitle>
                {version2.summaries.map((summary, i) => (
                  <ContentItem key={i}>
                    <strong>
                      {summary.sum_article_number}조: {summary.sum_article_title}
                    </strong>
                    <p>{highlightDifferences(summary.sum_summary, version1.summaries[i]?.sum_summary || "")}</p>
                  </ContentItem>
                ))}
              </Section>
            </VersionColumn>
          </>
        )}
        {(activeTab === "unfair" || activeTab === "toxic") && (
          <>
            <VersionColumn>
              <VersionTitle>버전 {selectedVersions[0]}</VersionTitle>
              <Section>
                <SectionTitle>{activeTab === "unfair" ? "불공정 조항" : "독소 조항"}</SectionTitle>
                {groupedClauses
                  .filter((group) =>
                    group.versions.some(
                      (v) => v.version === selectedVersions[0] && (activeTab === "unfair" ? v.unfair : v.toxic),
                    ),
                  )
                  .map((group, i) => {
                    const versionData = group.versions.find((v) => v.version === selectedVersions[0])
                    if (!versionData) return null
                    return (
                      <ContentItem key={i}>
                        <strong>
                          {group.article}조{group.clause !== null && ` ${group.clause}항`}
                          {group.subclause !== null && ` ${group.subclause}호`}
                        </strong>
                        <p>
                          {highlightDifferences(
                            versionData.sentence,
                            group.versions.find((v) => v.version === selectedVersions[1])?.sentence || "",
                          )}
                        </p>
                      </ContentItem>
                    )
                  })}
              </Section>
            </VersionColumn>
            <VersionColumn>
              <VersionTitle>버전 {selectedVersions[1]}</VersionTitle>
              <Section>
                <SectionTitle>{activeTab === "unfair" ? "불공정 조항" : "독소 조항"}</SectionTitle>
                {groupedClauses
                  .filter((group) =>
                    group.versions.some(
                      (v) => v.version === selectedVersions[1] && (activeTab === "unfair" ? v.unfair : v.toxic),
                    ),
                  )
                  .map((group, i) => {
                    const versionData = group.versions.find((v) => v.version === selectedVersions[1])
                    if (!versionData) return null
                    return (
                      <ContentItem key={i}>
                        <strong>
                          {group.article}조{group.clause !== null && ` ${group.clause}항`}
                          {group.subclause !== null && ` ${group.subclause}호`}
                        </strong>
                        <p>
                          {highlightDifferences(
                            versionData.sentence,
                            group.versions.find((v) => v.version === selectedVersions[0])?.sentence || "",
                          )}
                        </p>
                      </ContentItem>
                    )
                  })}
              </Section>
            </VersionColumn>
          </>
        )}
      </ComparisonContainer>
      <BackButton onClick={() => router.back()}>뒤로 가기</BackButton>
    </Container>
  )
}

