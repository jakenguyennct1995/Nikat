import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface HomeProduct {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discountLabel?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  protected readonly features: FeatureItem[] = [
    {
      icon: '⚡',
      title: 'Giao hỏa tốc',
      description: 'Nhận hàng trong 2h'
    },
    {
      icon: '↺',
      title: 'Đổi trả miễn phí',
      description: 'Trong vòng 7 ngày'
    },
    {
      icon: '✓',
      title: 'Chính hãng 100%',
      description: 'Cam kết chất lượng'
    },
    {
      icon: '☎',
      title: 'Hỗ trợ 24/7',
      description: 'Luôn luôn sẵn sàng'
    }
  ];

  protected readonly featuredProducts: HomeProduct[] = [
    {
      name: 'Pate Whiskas Vị Cá Thu 400g - Dinh Dưỡng Cao Cấp',
      price: 35000,
      originalPrice: 46000,
      image:
        'https://images.unsplash.com/photo-1583511655826-05700442b31b?auto=format&fit=crop&w=900&q=80',
      discountLabel: '-25%'
    },
    {
      name: 'Đồ Chơi Dây Thừng Cho Chó - Cotton Tự Nhiên',
      price: 79000,
      image:
        'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Nệm Ngủ Marshmallow Siêu Êm Cho Mèo',
      price: 199000,
      originalPrice: 250000,
      image:
        'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Balo Vận Chuyển Thú Cưng Vải Lưới Thoáng Khí',
      price: 325000,
      image:
        'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Bát Ăn Inox Chống Trượt Cho Chó Mèo',
      price: 89000,
      originalPrice: 119000,
      image:
        'https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=900&q=80',
      discountLabel: '-20%'
    }
  ];
}
