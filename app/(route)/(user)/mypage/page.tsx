'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import {
  Container,
  ProfileCard,
  ProfileHeader,
  UserName,
  EditButton,
  UserEmail,
  Form,
  FormGroup,
  Label,
  Input,
  InputWithCheck,
  VerifiedCheck,
  StatsContainer,
  StatItem,
  DeleteButton,
  Modal,
  ModalContent,
  ModalTitle,
  ModalText,
  ModalButtons,
  ModalButton,
  Alert,
} from './mypage.styled';

interface UserProfile {
  user_id: number;
  user_name: string;
  user_email: string;
  user_phone: string;
}

interface UserStats {
  analyzed_count: number;
  unfair_count: number;
  toxic_count: number;
}

export default function MyPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({
    analyzed_count: 0,
    unfair_count: 0,
    toxic_count: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Set the profile with the user data from the database
          setProfile({
            user_id: data.userId,
            user_name: data.userName,  // Match the database field
            user_email: data.userEmail,
            user_phone: data.userPhone
          });

          // Also fetch user stats
          const statsResponse = await fetch('/api/contracts', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (statsResponse.ok) {
            const contracts = await statsResponse.json();
            setStats({
              analyzed_count: contracts.length,
              unfair_count: contracts.filter((c: any) => c.con_unfair).length,
              toxic_count: contracts.filter((c: any) => c.con_toxic).length,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [router]);

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('authToken');
        router.push('/');
      } else {
        const data = await response.json();
        setAlert({ type: 'error', message: data.error });
      }
    } catch (error) {
      setAlert({ type: 'error', message: '계정 삭제 중 오류가 발생했습니다.' });
    }
    setShowDeleteModal(false);
  };

  if (!profile) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <ProfileCard>
        <ProfileHeader>
          <UserName>{profile.user_name} 님</UserName>
          <EditButton onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? '취소' : 'EDIT'}
          </EditButton>
        </ProfileHeader>
        <UserEmail>{profile.user_email}</UserEmail>

        {alert && (
          <Alert type={alert.type}>
            {alert.message}
          </Alert>
        )}

        <Form>
          <FormGroup>
            <Label>이름</Label>
            <Input
              type="text"
              value={profile.user_name}
              disabled={!isEditing}
              onChange={(e) => setProfile({ ...profile, user_name: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label>이메일</Label>
            <InputWithCheck>
              <Input
                type="email"
                value={profile.user_email}
                disabled
              />
              <VerifiedCheck>
                <CheckCircle size={16} />
              </VerifiedCheck>
            </InputWithCheck>
          </FormGroup>

          {isEditing && (
            <FormGroup>
              <Label>비밀번호</Label>
              <Input
                type="password"
                placeholder="새 비밀번호를 입력하세요"
              />
            </FormGroup>
          )}

          <StatsContainer>
            <StatItem>
              <span>계약서 분석 횟수</span>
              <span>{stats.analyzed_count} 회</span>
            </StatItem>
            <StatItem>
              <span>판별된 불공정성 조항 수</span>
              <span>{stats.unfair_count} 개</span>
            </StatItem>
            <StatItem>
              <span>판별된 독소 조항 수</span>
              <span>{stats.toxic_count} 개</span>
            </StatItem>
          </StatsContainer>

          <DeleteButton type="button" onClick={() => setShowDeleteModal(true)}>
            회원 탈퇴
          </DeleteButton>
        </Form>
      </ProfileCard>

      {showDeleteModal && (
        <Modal>
          <ModalContent>
            <ModalTitle>회원 탈퇴</ModalTitle>
            <ModalText>
              정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 데이터가 삭제됩니다.
            </ModalText>
            <ModalButtons>
              <ModalButton onClick={() => setShowDeleteModal(false)}>
                취소
              </ModalButton>
              <ModalButton $danger onClick={handleDeleteAccount}>
                탈퇴하기
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

