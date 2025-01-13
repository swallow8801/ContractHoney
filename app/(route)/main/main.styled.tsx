import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    scroll-behavior: smooth;
    position: relative;
    
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        display: none;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;

    /* Smooth scroll on iOS */
    -webkit-overflow-scrolling: touch;
`;

export const Group = styled.div<{ $backgroundImage: string }>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
    transition: all 0.5s ease-in-out;

    background-image: ${({ $backgroundImage }) => `url(${$backgroundImage})`};

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }
`;

export const Title = styled.h1`
    font-size: 48px;
    font-weight: bold;
    color: white;
    margin-bottom: 20px;
    z-index: 2;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards;

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 2;
    width: 100%;
    max-width: 400px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards 0.2s;
`;

export const Select = styled.select`
    padding: 15px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    transition: all 0.3s ease;

    &:hover {
        border-color: rgba(255, 255, 255, 0.4);
    }

    &:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.6);
    }
`;

export const Button = styled.button`
    padding: 15px 30px;
    background-color: #2c2c2c;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #444;
        transform: translateY(-2px);
    }
`;

export const Notice = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    max-width: 600px;
    z-index: 2;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards 0.2s;
`;

export const NoticeItem = styled.div`
    background-color: rgba(255, 255, 255, 0.9);
    padding: 15px;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateX(10px);
    }
`;

export const ViewAll = styled.button`
    align-self: flex-end;
    margin-top: 10px;
    padding: 10px;
    font-size: 16px;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    color: white;
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(5px);
    }
`;

export const FileUploadContainer = styled.div`
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
`;

export const FileUploadArea = styled.div<{ $isDragging?: boolean }>`
    padding: 20px;
    border: 2px dashed ${props => props.$isDragging ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'};
    border-radius: 8px;
    background: ${props => props.$isDragging ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
    color: white;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 0.1);
    }
`;

export const FileInput = styled.input`
    display: none;
`;

export const FileName = styled.div`
    color: white;
    margin-top: 10px;
    font-size: 14px;
    word-break: break-all;
`;

export const SearchableSelect = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  &:hover, &:focus {
    border-color: rgba(255, 255, 255, 0.6);
    outline: none;
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const DropdownItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.div`
  color: #333;
  font-size: 16px;
  margin-top: 10px;
`;

