export const initialMembers = [
    {
        id: '1',
        name: 'Nguyễn Văn A',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        stats: {
            stat1: 85, // Nút số
            stat2: 70, // Mặt chạm
            stat3: 90, // Tài chính
            stat4: 80, // Độ lỳ
        }
    },
    {
        id: '2',
        name: 'Trần Thị B',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
        stats: {
            stat1: 45,
            stat2: 95,
            stat3: 75,
            stat4: 60,
        }
    },
    {
        id: '3',
        name: 'Lê Văn C',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        stats: {
            stat1: 95,
            stat2: 50,
            stat3: 60,
            stat4: 90,
        }
    },
    {
        id: '4',
        name: 'Phạm Thị D',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dora',
        stats: {
            stat1: 60,
            stat2: 85,
            stat3: 80,
            stat4: 70,
        }
    },
    {
        id: '5',
        name: 'Hoàng Văn E',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elmo',
        stats: {
            stat1: 75,
            stat2: 75,
            stat3: 75,
            stat4: 75,
        }
    }
];

export const statConfig = {
    stat1: { label: 'Nút số', color: '#FF6B6B' },   // Red/Outcome related?
    stat2: { label: 'Mặt chạm', color: '#4ECDC4' }, // Teal/Face related
    stat3: { label: 'Tài chính', color: '#FED766' },// Yellow/Gold
    stat4: { label: 'Độ lỳ', color: '#2AB7CA' },    // Blue/Resilience
};
