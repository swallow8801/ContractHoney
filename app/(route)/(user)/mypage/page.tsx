'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, FileText, AlertTriangle, Zap } from 'lucide-react';
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
  StatIcon,
  StatInfo,
  StatLabel,
  StatValue,
  DeleteButton,
  Modal,
  ModalContent,
  ModalTitle,
  ModalText,
  ModalButtons,
  ModalButton,
  Alert,
  StatGroup,
  StatGroupLabel,
  StatGroupItem,
  Main,
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
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile({
            user_id: data.userId,
            user_name: data.userName,
            user_email: data.userEmail,
            user_phone: data.userPhone
          });
          setEditedName(data.userName);
          setEditedPhone(data.userPhone.replace(/-/g, ''));

          const statsResponse = await fetch('/api/contracts', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (statsResponse.ok) {
            const contracts = await statsResponse.json();
            setStats({
              analyzed_count: contracts.length,
              unfair_count: contracts.reduce((sum: number, contract: any) => sum + (contract.unfair_count || 0), 0),
              toxic_count: contracts.reduce((sum: number, contract: any) => sum + (contract.toxic_count || 0), 0),
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

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: editedName,
          user_phone: editedPhone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ type: 'success', message: '정보가 성공적으로 업데이트되었습니다.' });
        setIsEditing(false);
        setProfile(prevProfile => ({
          ...prevProfile ? prevProfile : { user_id: 0, user_name: '', user_email: '', user_phone: '' },
          user_name: editedName,
          user_phone: editedPhone
        }));
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      } else {
        setAlert({ type: 'error', message: data.error || '정보 업데이트에 실패했습니다.' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: '서버 오류가 발생했습니다.' });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
    setEditedPhone(value);
  };

  if (!profile) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Main>
        <ProfileCard>
          <ProfileHeader>
            <UserName>{profile.user_name} 님</UserName>
            <EditButton onClick={() => isEditing ? handleSave() : setIsEditing(!isEditing)}>
              {isEditing ? '저장' : 'EDIT'}
            </EditButton>
          </ProfileHeader>
          <UserEmail>{profile.user_email}</UserEmail>

          <Form>
            <FormGroup>
              <Label>이름</Label>
              <Input
                type="text"
                value={isEditing ? editedName : profile.user_name}
                disabled={!isEditing}
                onChange={(e) => setEditedName(e.target.value.slice(0, 12))}
                maxLength={12}
              />
            </FormGroup>

            <FormGroup>
              <Label>이메일</Label>
              <InputWithCheck>
                <Input
                  type="email"
                  value={profile.user_email}
                  disabled={true}
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
                <VerifiedCheck>
                  <CheckCircle size={16} />
                </VerifiedCheck>
              </InputWithCheck>
            </FormGroup>

            <FormGroup>
              <Label>전화번호</Label>
              <Input
                type="tel"
                value={isEditing ? editedPhone : profile.user_phone.replace(/-/g, '')}
                disabled={!isEditing}
                onChange={handlePhoneChange}
                placeholder="01012345678"
                maxLength={11}
              />
            </FormGroup>
            {alert && (
              <Alert type={alert.type}>
                {alert.message}
              </Alert>
            )}

            <StatsContainer>
              <StatItem>
                <StatIcon>
                  <FileText size={24} />
                </StatIcon>
                <StatInfo>
                  <StatLabel>계약서 분석 횟수</StatLabel>
                  <StatValue>{stats.analyzed_count}</StatValue>
                </StatInfo>
              </StatItem>
              <StatItem>
                <StatIcon>
                  <AlertTriangle size={24} />
                </StatIcon>
                <StatInfo>
                  <StatGroupLabel>판별된 조항</StatGroupLabel>
                  <StatGroup>
                    <StatGroupItem>
                      <StatLabel>불공정 조항</StatLabel>
                      <StatValue>{stats.unfair_count}</StatValue>
                    </StatGroupItem>
                    <StatGroupItem>
                      <StatLabel>독소 조항</StatLabel>
                      <StatValue>{stats.toxic_count}</StatValue>
                    </StatGroupItem>
                  </StatGroup>
                </StatInfo>
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
      </Main>
    </Container>
  );
}

