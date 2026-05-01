export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const NAME_REGEX = /^\S{2,8}$/;

// 이메일 검증
export const validateEmail = (email: string): string | true => {
    if (!email) return '이메일을 입력하세요';
    if (!EMAIL_REGEX.test(email)) return '올바른 이메일 형식이 아닙니다';
    return true;
};

// 비밀번호 검증
export const validatePassword = (password: string): string | true => {
    if (!password) return '비밀번호를 입력하세요';
    if (password.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다';
    if (!PASSWORD_REGEX.test(password)) {
        return '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다';
    }
    return true;
};

// 이름 검증
export const validateName = (name: string): string | true => {
    if (!name) return '이름을 입력하세요';
    if (/\s/.test(name)) return '이름에 공백을 포함할 수 없습니다';
    if (name.length < 2 || name.length > 8) {
        return '이름은 2자 이상 8자 이하여야 합니다';
    }
    return true;
};

// 문의 폼 성함 검증 (2~20자)
export const validateInquiryName = (name: string): string | true => {
    if (!name.trim()) return '성함을 입력해주세요.';
    if (name.length < 2 || name.length > 20) {
        return '성함은 2~20자리로 입력해주세요.';
    }
    return true;
};

// 회사명 검증 (선택, 입력 시 2~20자)
export const validateCompany = (company: string): string | true => {
    if (!company.trim()) return true;
    if (company.length < 2 || company.length > 20) {
        return '회사명은 2~20자리로 입력해주세요.';
    }
    return true;
};

// 문의 내용 검증
export const validateContent = (content: string): string | true => {
    if (!content.trim()) return '내용을 입력해주세요.';
    return true;
};
