"""empty message

Revision ID: 9bfe3991d73b
Revises: 
Create Date: 2021-04-13 15:54:24.185644

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9bfe3991d73b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userinfo',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('password_hash', sa.String(), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('userposts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.BigInteger(), nullable=True),
    sa.Column('posts', sa.String(length=5000), nullable=True),
    sa.Column('postdate', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['userid'], ['userinfo.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('userposts')
    op.drop_table('userinfo')
    # ### end Alembic commands ###